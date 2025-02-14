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

    const getNodeRadius = (d: NodeDatum) => (isMobile ? 20 : d.group === 1 ? 45 : 35);
    const getFontSize = (d: NodeDatum) => (isMobile ? "16px" : d.group === 1 ? "32px" : "24px");
    const linkDistance = isMobile ? 130 : 250;
    const chargeStrength = isMobile ? -350 : -800;

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
      .force("collision", d3.forceCollide().radius(isMobile ? 30 : 40));

    const svg = d3
      .create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    // Add glow filter
    const defs = svg.append("defs");
    const filter = defs
      .append("filter")
      .attr("id", "glow")
      .attr("x", "-50%")
      .attr("y", "-50%")
      .attr("width", "200%")
      .attr("height", "200%");

    filter
      .append("feGaussianBlur")
      .attr("class", "blur")
      .attr("stdDeviation", "3")
      .attr("result", "coloredBlur");

    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    const g = svg.append("g");

    const link = g
      .append("g")
      .attr("stroke", "#666")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", (d) => Math.sqrt(d.value || 1) * (isMobile ? 0.8 : 1.8));

    // Create node groups
    const node = g
      .append("g")
      .attr("stroke-width", 1.5)
      .selectAll<SVGGElement, NodeDatum>("g")
      .data(nodes)
      .join("g")
      .attr("class", "node")
      .style("cursor", isMobile ? "default" : "pointer");

    // Append a child group for scalable elements (circle and emoji)
    const scalable = node.append("g").attr("class", "scalable");

    // Append the circle (no hover events here now)
    scalable
      .append("circle")
      .attr("r", getNodeRadius)
      .attr("fill", "#333")
      .attr("stroke", "#555")
      .style("transition", "filter 0.3s ease");

    // Append the emoji text
    scalable
      .append("text")
      .text((d) => d.emoji)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .style("font-size", getFontSize)
      .style("font-family", "Apple Color Emoji, sans-serif")
      .style("pointer-events", "none")
      .attr("fill", "#ffffff");

    // Append interactive labels (outside the scalable group so they don't scale)
    if (!isMobile) {
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
    }

    // Add hover events on the node group (for non-mobile)
    if (!isMobile) {
      node
        .on("mouseover", function () {
          // Scale up the inner (scalable) group
          d3.select(this)
            .select(".scalable")
            .transition()
            .duration(400)
            .ease(d3.easeCubicInOut) // added easing for gradual animation
            .attr("transform", "scale(1.2)");
          // Apply glow filter on the circle
          d3.select(this).select("circle").style("filter", "url(#glow)").attr("stroke", "#888");
        })
        .on("mouseout", function () {
          // Revert scale back to normal
          d3.select(this)
            .select(".scalable")
            .transition()
            .duration(400)
            .ease(d3.easeCubicInOut) // added easing for gradual animation
            .attr("transform", "scale(1)");
          // Remove glow filter on the circle
          d3.select(this).select("circle").style("filter", "none").attr("stroke", "#555");
        })
        // Toggle label on click
        .on("click", function () {
          const label = d3.select(this).select(".label");
          const currentOpacity = label.style("opacity");
          label.style("opacity", currentOpacity === "0" ? 1 : 0);
        });
    }

    // Drift effect
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
      // Keep nodes within boundaries
      nodes.forEach((d) => {
        if (d.x == null || d.y == null || d.vx == null || d.vy == null) return;
        const r = getNodeRadius(d);
        if (d.x - r < -width / 2) {
          d.x = -width / 2 + r;
          d.vx *= -1;
        }
        if (d.x + r > width / 2) {
          d.x = width / 2 - r;
          d.vx *= -1;
        }
        if (d.y - r < -height / 2) {
          d.y = -height / 2 + r;
          d.vy *= -1;
        }
        if (d.y + r > height / 2) {
          d.y = height / 2 - r;
          d.vy *= -1;
        }
      });

      // Update link positions
      link
        .attr("x1", (d) => (d.source as NodeDatum).x!)
        .attr("y1", (d) => (d.source as NodeDatum).y!)
        .attr("x2", (d) => (d.target as NodeDatum).x!)
        .attr("y2", (d) => (d.target as NodeDatum).y!);

      // Update node positions (outer group)
      node.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
    });

    // Drag behavior for non-mobile
    if (!isMobile) {
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
    }

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
