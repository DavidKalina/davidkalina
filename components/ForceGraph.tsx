"use client";
import React, { useEffect, useRef } from "react";
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
  { id: "1", label: "Web Dev", emoji: "👨‍💻", group: 1 }, // Central node
  // Core Skills & Tech
  { id: "2", label: "React", emoji: "⚛️", group: 2 },
  { id: "3", label: "TypeScript", emoji: "📘", group: 2 },
  { id: "4", label: "UI/UX", emoji: "🎨", group: 2 },
  // Tech Interests
  { id: "5", label: "Data Viz", emoji: "📊", group: 3 },
  { id: "6", label: "Performance", emoji: "⚡", group: 3 },
  { id: "7", label: "AI/ML", emoji: "🤖", group: 3 },
  // Personal Interests
  { id: "8", label: "Coffee", emoji: "☕", group: 4 },
  { id: "9", label: "Longboard", emoji: "🛹", group: 4 },
  { id: "10", label: "Gaming", emoji: "🎮", group: 4 },
  { id: "11", label: "Walking", emoji: "🚶", group: 4 },
];

const defaultLinks: LinkDatum[] = [
  // Core tech connections
  { source: "1", target: "2", value: 2 },
  { source: "1", target: "3", value: 2 },
  { source: "1", target: "4", value: 2 },
  // Tech interest connections
  { source: "2", target: "5", value: 1.5 },
  { source: "3", target: "6", value: 1.5 },
  { source: "4", target: "7", value: 1.5 },
  // Personal interests connecting to relevant tech
  { source: "5", target: "8", value: 1 }, // Data Viz -> Coffee (tracking/analyzing coffee recipes)
  { source: "6", target: "9", value: 1 }, // Performance -> Longboard
  { source: "7", target: "10", value: 1 }, // AI/ML -> Gaming
  { source: "4", target: "10", value: 1 }, // UI/UX -> Gaming
  // Walking connects to both physical activities
  { source: "9", target: "11", value: 1 }, // Longboard -> Walking
  { source: "8", target: "11", value: 1 }, // Coffee -> Walking (coffee walks!)
];

const ForceGraph = ({ width, height }: { width: number; height: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nodes: NodeDatum[] = defaultNodes.map((d) => ({ ...d }));
    const links: LinkDatum[] = defaultLinks.map((d) => ({ ...d }));

    const simulation = d3
      .forceSimulation<NodeDatum, LinkDatum>(nodes)
      .force(
        "link",
        d3
          .forceLink<NodeDatum, LinkDatum>(links)
          .id((d) => d.id)
          .distance(250)
      )
      .force("charge", d3.forceManyBody().strength(-800))
      .force("center", d3.forceCenter(0, 0))
      .force("x", d3.forceX().strength(0.1))
      .force("y", d3.forceY().strength(0.1));

    const svg = d3
      .create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    const link = svg
      .append("g")
      .attr("stroke", "#666")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", (d) => Math.sqrt(d.value || 1) * 3);

    const node = svg
      .append("g")
      .attr("stroke-width", 1.5)
      .selectAll<SVGGElement, NodeDatum>("g")
      .data(nodes)
      .join("g")
      .style("cursor", "pointer") as d3.Selection<SVGGElement, NodeDatum, SVGGElement, unknown>;

    // Create node circles
    node
      .append("circle")
      .attr("r", (d) => (d.group === 1 ? 45 : 35))
      .attr("fill", "#333")
      .attr("stroke", "#555");

    // Add title for hover text
    node.append("title").text((d) => d.label);

    // Add emoji as text
    node
      .append("text")
      .text((d) => d.emoji)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle") // centers text vertically
      .style("font-size", (d) => (d.group === 1 ? "32px" : "24px"))
      .style("font-family", "Apple Color Emoji, sans-serif")
      .style("pointer-events", "none")
      .attr("fill", "#ffffff");

    // Add continuous gentle drift
    setInterval(() => {
      nodes.forEach((node) => {
        // Skip if node is being dragged
        if (!node.fx && !node.fy) {
          // Add very small random force
          const angle = Math.random() * 2 * Math.PI;
          const force = 0.05; // Reduced force magnitude
          // Gradually adjust velocity instead of setting it
          node.vx = (node.vx || 0) * 0.9 + Math.cos(angle) * force;
          node.vy = (node.vy || 0) * 0.9 + Math.sin(angle) * force;
        }
      });
      simulation.alpha(0.05).restart(); // Lower alpha for smoother transitions
    }, 200); // Increased interval for smoother animation

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => (d.source as NodeDatum).x!)
        .attr("y1", (d) => (d.source as NodeDatum).y!)
        .attr("x2", (d) => (d.target as NodeDatum).x!)
        .attr("y2", (d) => (d.target as NodeDatum).y!);

      node.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
    });

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
      simulation.stop();
    };
  }, []);

  return <div ref={containerRef} />;
};

export default ForceGraph;
