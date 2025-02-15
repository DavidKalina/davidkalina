"use client";
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface NodeDatum extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  emoji: string;
  group?: number;
  description: string;
}

interface LinkDatum extends d3.SimulationLinkDatum<NodeDatum> {
  value?: number;
}

const defaultNodes: NodeDatum[] = [
  // Initial Phase - Understanding and Planning
  {
    id: "1",
    label: "1. Idea",
    emoji: "💡",
    group: 1,
    description:
      "Share your app idea with me. We'll discuss your vision, target audience, and core features that will make your app stand out in the market.",
  },
  {
    id: "2",
    label: "2. Discovery",
    emoji: "🔍",
    group: 1,
    description:
      "Deep dive into your requirements. We'll explore user stories, identify potential challenges, and outline the key functionalities needed for success.",
  },
  {
    id: "3",
    label: "3. Research",
    emoji: "📚",
    group: 1,
    description:
      "Market and technical research phase. We'll analyze competitors, explore technology options, and determine the best tech stack for your specific needs.",
  },

  // Planning Phase - Design and Architecture
  {
    id: "4",
    label: "4. Planning",
    emoji: "📋",
    group: 2,
    description:
      "Create a detailed project roadmap. We'll break down the development into sprints, set milestones, and establish clear deliverables and timelines.",
  },
  {
    id: "5",
    label: "5. UI/UX",
    emoji: "🎨",
    group: 2,
    description:
      "Design the user interface and experience. We'll create wireframes, mockups, and interactive prototypes to visualize your app before development begins.",
  },
  {
    id: "6",
    label: "6. Architecture",
    emoji: "🏗️",
    group: 2,
    description:
      "Design the technical architecture. We'll plan the database structure, API endpoints, and ensure scalability, security, and performance are built-in from the start.",
  },

  // Development Phase - Building and Testing
  {
    id: "7",
    label: "7. Development",
    emoji: "👨‍💻",
    group: 3,
    description:
      "Write clean, efficient code. We'll implement features according to the plan, following best practices and maintaining high code quality standards.",
  },
  {
    id: "8",
    label: "8. Testing",
    emoji: "🧪",
    group: 3,
    description:
      "Rigorous testing process. We'll conduct unit tests, integration tests, and user acceptance testing to ensure everything works flawlessly.",
  },
  {
    id: "9",
    label: "9. Feedback",
    emoji: "💭",
    group: 3,
    description:
      "Regular feedback loops. We'll review progress, gather your input, and make adjustments to ensure the app meets your vision and user needs.",
  },

  // Launch Phase - Deployment and Growth
  {
    id: "10",
    label: "10. Launch",
    emoji: "🚀",
    group: 4,
    description:
      "Deploy your app to production. We'll handle the deployment process, ensuring a smooth launch with monitoring and backup systems in place.",
  },
  {
    id: "11",
    label: "11. Maintenance",
    emoji: "🔧",
    group: 4,
    description:
      "Ongoing support and updates. We'll monitor performance, fix any issues that arise, and implement security patches to keep your app running smoothly.",
  },
  {
    id: "12",
    label: "12. Growth",
    emoji: "📈",
    group: 4,
    description:
      "Scale and improve your app. We'll analyze user data, implement new features, and optimize performance to help your app grow and succeed.",
  },
];

const defaultLinks: LinkDatum[] = [
  // Initial phase
  { source: "1", target: "2", value: 2 },
  { source: "2", target: "3", value: 2 },

  // Planning phase
  { source: "3", target: "4", value: 2 },
  { source: "4", target: "5", value: 1.5 },
  { source: "4", target: "6", value: 1.5 },

  // Development phase
  { source: "5", target: "6", value: 1.5 },
  { source: "6", target: "7", value: 1.5 },
  { source: "7", target: "8", value: 1.5 },
  { source: "8", target: "9", value: 1.5 },
  { source: "9", target: "7", value: 1 }, // Feedback loop back to development

  // Launch and beyond
  { source: "8", target: "9", value: 2 },
  { source: "9", target: "10", value: 1.5 },
  { source: "10", target: "11", value: 1.5 },
  { source: "11", target: "12", value: 1 }, // Growth leads to more feedback
];

interface ForceGraphProps {
  width: number;
  height: number;
  onPopupRequest?: (node: NodeDatum, x: number, y: number) => void;
  activePopupNodeId?: string;
  onPopupMove?: (x: number, y: number) => void;
}

const ForceGraph = ({ width, height, onPopupRequest, onPopupMove }: ForceGraphProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Clone the data so we don’t mutate the defaults.
    const nodes: NodeDatum[] = defaultNodes.map((d) => ({ ...d }));
    const links: LinkDatum[] = defaultLinks.map((d) => ({ ...d }));

    const getNodeRadius = (d: NodeDatum) => (isMobile ? 20 : d.group === 1 ? 45 : 35);
    const getFontSize = (d: NodeDatum) => (isMobile ? "16px" : d.group === 1 ? "32px" : "24px");
    const linkDistance = isMobile ? 130 : 350;
    const chargeStrength = isMobile ? -350 : -800;
    const lingerDuration = 3000; // milliseconds

    // Create the force simulation.
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

    // Create the SVG container.
    const svg = d3
      .create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    // Add a glow filter.
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

    // Draw links.
    const link = g
      .append("g")
      .attr("stroke", "#666")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", (d) => Math.sqrt(d.value || 1) * (isMobile ? 0.8 : 1.8));

    // Draw nodes.
    const node = g
      .append("g")
      .attr("stroke-width", 1.5)
      .selectAll<SVGGElement, NodeDatum>("g")
      .data(nodes)
      .join("g")
      .attr("class", "node")
      .attr("data-id", (d) => d.id)
      .style("cursor", isMobile ? "default" : "pointer");

    // Add scalable circle and emoji.
    const scalable = node.append("g").attr("class", "scalable");
    scalable
      .append("circle")
      .attr("r", getNodeRadius)
      .attr("fill", "#333")
      .attr("stroke", "#555")
      .style("transition", "filter 0.3s ease");
    scalable
      .append("text")
      .text((d) => d.emoji)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .style("font-size", getFontSize)
      .style("font-family", "Apple Color Emoji, sans-serif")
      .style("pointer-events", "none")
      .attr("fill", "#ffffff");

    // Optionally add hover labels (for non-mobile).
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

    // Add hover effects for non-mobile.
    // Define drag handlers
    const drag = d3
      .drag<SVGGElement, NodeDatum>()
      .on("start", (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on("drag", (event, d) => {
        d.fx = event.x;
        d.fy = event.y;

        if (onPopupMove) onPopupMove(event.x, event.y);
      })
      .on("end", (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    // Apply drag behavior to nodes
    node.call(drag);

    // Create a slight drift effect.
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

    // Set up the golden marker.
    const goldenMarker = g
      .append("circle")
      .attr("r", isMobile ? 3 : 4)
      .attr("fill", "gold")
      .style("pointer-events", "none")
      .style("opacity", 0);

    // Golden marker animation along a predefined sequence.
    const goldenPathSequence = defaultNodes
      .sort((a, b) => Number(a.id) - Number(b.id))
      .map((node) => node.id);
    let currentIndex = 0;
    let activeGolden = {
      sourceId: "",
      targetId: "",
      startTime: 0,
      duration: 1000, // travel time in ms
      inProgress: false,
      lingerTriggered: false,
    };

    let initialNodeHandled = false;
    let initialNodeStartTime = 0;

    const goldenTimer = d3.timer(() => {
      if (!activeGolden.inProgress) {
        if (!initialNodeHandled) {
          const initialNode = nodes.find((n) => n.id === goldenPathSequence[0]);

          if (initialNode && initialNode.x != null && initialNode.y != null) {
            if (initialNodeStartTime === 0) {
              // First time seeing initial node - set up initial state
              initialNodeStartTime = Date.now();

              // Position the marker on the initial node
              goldenMarker.attr("cx", initialNode.x).attr("cy", initialNode.y).style("opacity", 0);

              // Highlight the initial node
              const initialNodeSelection = d3
                .select(`[data-id="${goldenPathSequence[0]}"]`)
                .select("circle");
              initialNodeSelection.attr("stroke", "gold").attr("stroke-width", isMobile ? 2 : 4);

              // Trigger popup for initial node
              if (onPopupRequest) {
                const popupY = initialNode.y - getNodeRadius(initialNode) - 20;
                onPopupRequest(initialNode, initialNode.x, popupY);
              }
            }

            // Check if we've waited long enough on the initial node
            if (Date.now() - initialNodeStartTime < lingerDuration) {
              return; // Keep waiting
            }

            // Time to move on from initial node
            initialNodeHandled = true;
            const initialNodeSelection = d3
              .select(`[data-id="${goldenPathSequence[0]}"]`)
              .select("circle");
            initialNodeSelection.attr("stroke", "#555").attr("stroke-width", isMobile ? 1 : 1.5);
          }
        }

        // Start a new golden marker travel.
        const sourceId = goldenPathSequence[currentIndex];
        const nextIndex = (currentIndex + 1) % goldenPathSequence.length;
        const targetId = goldenPathSequence[nextIndex];

        activeGolden = {
          sourceId,
          targetId,
          startTime: Date.now(),
          duration: 2000,
          inProgress: true,
          lingerTriggered: false,
        };

        goldenMarker.style("opacity", 1);
        currentIndex = nextIndex;
      } else {
        // Animate marker travel.
        const now = Date.now();
        let t = (now - activeGolden.startTime) / activeGolden.duration;
        if (t > 1) t = 1;

        const sourceNode = nodes.find((n) => n.id === activeGolden.sourceId);
        const targetNode = nodes.find((n) => n.id === activeGolden.targetId);
        if (
          sourceNode &&
          targetNode &&
          sourceNode.x != null &&
          sourceNode.y != null &&
          targetNode.x != null &&
          targetNode.y != null
        ) {
          const x1 = sourceNode.x,
            y1 = sourceNode.y,
            x2 = targetNode.x,
            y2 = targetNode.y;
          const dx = x2 - x1,
            dy = y2 - y1;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const r1 = getNodeRadius(sourceNode);
          const r2 = getNodeRadius(targetNode);

          // Calculate edge points so the marker stays on the edge of the circles.
          const sx = x1 + (dx / distance) * r1;
          const sy = y1 + (dy / distance) * r1;
          const ex = x2 - (dx / distance) * r2;
          const ey = y2 - (dy / distance) * r2;

          const markerX = sx + t * (ex - sx);
          const markerY = sy + t * (ey - sy);
          goldenMarker.attr("cx", markerX).attr("cy", markerY);

          // When the marker reaches the target...
          if (t === 1 && !activeGolden.lingerTriggered) {
            activeGolden.lingerTriggered = true;
            goldenMarker.style("opacity", 0);

            // Highlight the target node.
            const targetNodeSelection = d3
              .select(`[data-id="${activeGolden.targetId}"]`)
              .select("circle");
            targetNodeSelection.attr("stroke", "gold").attr("stroke-width", isMobile ? 2 : 4);

            // Instead of creating an SVG popup, call the callback.
            if (onPopupRequest) {
              const popupX = targetNode.x;
              const popupY = targetNode.y - getNodeRadius(targetNode) - 20;

              onPopupRequest(targetNode, popupX, popupY);
            }

            // After a linger period, remove the highlight and reset.
            d3.timeout(() => {
              targetNodeSelection.attr("stroke", "#555").attr("stroke-width", isMobile ? 1 : 1.5);
              activeGolden.inProgress = false;
              activeGolden.lingerTriggered = false;
            }, lingerDuration);
          }
        }
      }
    });

    // Update positions on each simulation tick.
    simulation.on("tick", () => {
      // Constrain nodes within the SVG.
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

      // Update link positions.
      link
        .attr("x1", (d) => (d.source as NodeDatum).x!)
        .attr("y1", (d) => (d.source as NodeDatum).y!)
        .attr("x2", (d) => (d.target as NodeDatum).x!)
        .attr("y2", (d) => (d.target as NodeDatum).y!);

      // Update node positions.
      node.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
    });

    // Add drag behavior for non-mobile devices.

    // Append the SVG to the container.
    if (containerRef.current) {
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(svg.node() as Node);
    }

    // Cleanup when the component unmounts.
    return () => {
      clearInterval(driftInterval);
      goldenTimer.stop();
      simulation.stop();
    };
  }, [width, height, isMobile, onPopupRequest]);

  return <div ref={containerRef} />;
};

export default ForceGraph;
