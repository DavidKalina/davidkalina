"use client";
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface NodeDatum extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  emoji: string;
  group?: number;
}

interface LinkDatum extends d3.SimulationLinkDatum<NodeDatum> {
  value?: number;
}

const defaultNodes: NodeDatum[] = [
  { id: "1", label: "Web Dev", emoji: "👨‍💻", group: 1 },
  { id: "2", label: "React", emoji: "⚛️", group: 2 },
  { id: "3", label: "TypeScript", emoji: "📘", group: 2 },
  { id: "4", label: "UI/UX", emoji: "🎨", group: 2 },
  { id: "5", label: "Data Viz", emoji: "📊", group: 3 },
  { id: "6", label: "Performance", emoji: "⚡", group: 3 },
  { id: "7", label: "AI/ML", emoji: "🤖", group: 3 },
  { id: "8", label: "Coffee", emoji: "☕", group: 4 },
  { id: "9", label: "Longboard", emoji: "🛹", group: 4 },
  { id: "10", label: "Gaming", emoji: "🎮", group: 4 },
  { id: "11", label: "Walking", emoji: "🚶", group: 4 },
];

const defaultLinks: LinkDatum[] = [
  { source: "1", target: "2", value: 2 },
  { source: "1", target: "3", value: 2 },
  { source: "1", target: "4", value: 2 },
  { source: "2", target: "5", value: 1.5 },
  { source: "3", target: "6", value: 1.5 },
  { source: "4", target: "7", value: 1.5 },
  { source: "5", target: "8", value: 1 },
  { source: "6", target: "9", value: 1 },
  { source: "7", target: "10", value: 1 },
  { source: "4", target: "10", value: 1 },
  { source: "9", target: "11", value: 1 },
  { source: "8", target: "11", value: 1 },
];

const ForceGraph = ({ width, height }: { width: number; height: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if we're on mobile based on screen width
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const nodes: NodeDatum[] = defaultNodes.map((d) => ({ ...d }));
    const links: LinkDatum[] = defaultLinks.map((d) => ({ ...d }));

    // Adjust forces based on screen size
    const getNodeRadius = (d: NodeDatum) => (isMobile ? 25 : d.group === 1 ? 45 : 35);
    const getFontSize = (d: NodeDatum) => (isMobile ? "18px" : d.group === 1 ? "32px" : "24px");
    const linkDistance = isMobile ? 150 : 250;
    const chargeStrength = isMobile ? -400 : -800;

    const simulation = d3
      .forceSimulation<NodeDatum, LinkDatum>(nodes)
      .force(
        "link",
        d3
          .forceLink<NodeDatum, LinkDatum>(links)
          .id((d) => d.id)
          .distance(linkDistance)
      )
      .force("charge", d3.forceManyBody().strength(chargeStrength))
      .force("center", d3.forceCenter(0, 0))
      .force("x", d3.forceX().strength(0.1))
      .force("y", d3.forceY().strength(0.1))
      // Add collision force to prevent overlap
      .force("collision", d3.forceCollide().radius(isMobile ? 30 : 40));

    const svg = d3
      .create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    // Add zoom behavior
    const zoom = d3
      .zoom<SVGSVGElement, undefined>()
      .scaleExtent([0.5, 2])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    svg.call(zoom as any);

    // Create a group for all elements that should be zoomed
    const g = svg.append("g");

    const link = g
      .append("g")
      .attr("stroke", "#666")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", (d) => Math.sqrt(d.value || 1) * (isMobile ? 2 : 3));

    const node = g
      .append("g")
      .attr("stroke-width", 1.5)
      .selectAll<SVGGElement, NodeDatum>("g")
      .data(nodes)
      .join("g")
      .style("cursor", "pointer");

    // Create node circles
    node.append("circle").attr("r", getNodeRadius).attr("fill", "#333").attr("stroke", "#555");

    // Add labels that appear on tap/click for mobile
    node
      .append("text")
      .text((d) => d.label)
      .attr("class", "label")
      .attr("text-anchor", "middle")
      .attr("dy", 45)
      .style("font-family", "monospace")
      .style("font-size", "12px")
      .style("fill", "#333")
      .style("opacity", 0);

    // Add emoji as text
    node
      .append("text")
      .text((d) => d.emoji)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .style("font-size", getFontSize)
      .style("font-family", "Apple Color Emoji, sans-serif")
      .style("pointer-events", "none")
      .attr("fill", "#ffffff");

    // Handle node click/tap
    node.on("click", function () {
      // Toggle label visibility
      const label = d3.select(this).select(".label");
      const currentOpacity = label.style("opacity");
      label.style("opacity", currentOpacity === "0" ? 1 : 0);
    });

    // Gentle drift with reduced movement for mobile
    const driftInterval = setInterval(() => {
      nodes.forEach((node) => {
        if (!node.fx && !node.fy) {
          const angle = Math.random() * 2 * Math.PI;
          const force = isMobile ? 0.02 : 0.05;
          node.vx = (node.vx || 0) * 0.9 + Math.cos(angle) * force;
          node.vy = (node.vy || 0) * 0.9 + Math.sin(angle) * force;
        }
      });
      simulation.alpha(0.05).restart();
    }, 200);

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => (d.source as NodeDatum).x!)
        .attr("y1", (d) => (d.source as NodeDatum).y!)
        .attr("x2", (d) => (d.target as NodeDatum).x!)
        .attr("y2", (d) => (d.target as NodeDatum).y!);

      node.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
    });

    // Modify drag behavior for better touch support
    function dragstarted(event: d3.D3DragEvent<SVGGElement, NodeDatum, unknown>, d: NodeDatum) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: d3.D3DragEvent<SVGGElement, NodeDatum, unknown>, d: NodeDatum) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: d3.D3DragEvent<SVGGElement, NodeDatum, unknown>, d: NodeDatum) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    node.call(
      d3
        .drag<SVGGElement, NodeDatum>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    );

    if (containerRef.current) {
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(svg.node() as Node);
    }

    return () => {
      clearInterval(driftInterval);
      simulation.stop();
    };
  }, [width, height, isMobile]);

  return <div ref={containerRef} />;
};

export default ForceGraph;
