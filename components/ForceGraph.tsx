"use client";
import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { forceSimulation, forceLink, forceManyBody, forceCenter, forceCollide, type Simulation } from "d3-force";
import { create, select } from "d3-selection";
import { drag } from "d3-drag";
import { timeout, type Timer } from "d3-timer";
import { NodeDatum, defaultNodes, LinkDatum, defaultLinks } from "@/constants/forceGraph";

// Calculate optimal link distance based on viewport size and number of nodes

interface ForceGraphProps {
  width: number;
  height: number;
  onPopupRequest?: (node: NodeDatum, x: number, y: number) => void;
  activePopupNodeId?: string;
  onPopupMove?: (x: number, y: number) => void;
}

const ForceGraph = ({
  width,
  height,
  onPopupRequest,
  onPopupMove,
  activePopupNodeId,
}: ForceGraphProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const simulationRef = useRef<Simulation<NodeDatum, LinkDatum> | null>(null);
  const goldenTimerRef = useRef<Timer | { stop: () => void } | null>(null);
  const activePopupNodeIdRef = useRef(activePopupNodeId);

  // Memoize expensive calculations
  const forceParams = useMemo(() => {
    const minDimension = Math.min(width, height);
    const nodeCount = defaultNodes.length;
    const baseDistance = minDimension / 3;
    const nodeFactor = Math.max(0.4, 1 - nodeCount * 0.03);
    const mobileScale = isMobile ? 0.6 : 1;

    return {
      linkDistance: baseDistance * nodeFactor * mobileScale,
      chargeStrength: isMobile ? -450 : -1200,
      centerForce: 0.05,
      collisionRadius: isMobile ? 35 : 50,
    };
  }, [width, height, isMobile]);

  // Memoize node and link data to prevent unnecessary recreations
  const graphData = useMemo(() => ({
    nodes: defaultNodes.map((d) => ({ ...d })),
    links: defaultLinks.map((d) => ({ ...d })),
  }), []);

  // Memoize node radius and font size calculations
  const nodeStyles = useMemo(() => ({
    getNodeRadius: (d: NodeDatum) => (isMobile ? 20 : d.group === 1 ? 45 : 35),
    getFontSize: (d: NodeDatum) => (isMobile ? "16px" : d.group === 1 ? "32px" : "24px"),
  }), [isMobile]);

  // Optimized initial position calculation
  const calculateInitialPositions = useCallback((nodes: NodeDatum[], width: number, height: number) => {
    const radius = Math.min(width, height) * 0.4;
    const centerX = 0;
    const centerY = 0;

    nodes.forEach((node, i) => {
      const angle = (i / nodes.length) * 2 * Math.PI;
      node.x = centerX + radius * Math.cos(angle);
      node.y = centerY + radius * Math.sin(angle);
      node.x += (Math.random() - 0.5) * radius * 0.2;
      node.y += (Math.random() - 0.5) * radius * 0.2;
    });
  }, []);

  // Optimized graph spread detection
  const isGraphSpreadOut = useCallback((nodes: NodeDatum[]) => {
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node.x != null && node.y != null) {
        minX = Math.min(minX, node.x);
        maxX = Math.max(maxX, node.x);
        minY = Math.min(minY, node.y);
        maxY = Math.max(maxY, node.y);
      }
    }

    const spreadX = maxX - minX;
    const spreadY = maxY - minY;
    return spreadX > width * 0.6 && spreadY > height * 0.6;
  }, [width, height]);

  // Optimized popup request handler
  const handlePopupRequest = useCallback((node: NodeDatum, x: number, y: number) => {
    if (onPopupRequest) {
      onPopupRequest(node, x, y);
    }
  }, [onPopupRequest]);

  // Optimized popup move handler
  const handlePopupMove = useCallback((x: number, y: number) => {
    if (onPopupMove) {
      onPopupMove(x, y);
    }
  }, [onPopupMove]);

  useEffect(() => {
    activePopupNodeIdRef.current = activePopupNodeId;
  }, [activePopupNodeId]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();

    const handleResize = () => {
      const wasMobile = isMobile;
      const newIsMobile = window.innerWidth < 768;
      if (wasMobile !== newIsMobile) {
        setIsMobile(newIsMobile);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  useEffect(() => {
    const { nodes, links } = graphData;
    const { getNodeRadius } = nodeStyles;
    const lingerDuration = 3000;

    // Calculate initial positions
    calculateInitialPositions(nodes, width, height);

    // Create the force simulation with optimized parameters
    const simulation = forceSimulation<NodeDatum, LinkDatum>(nodes)
      .force(
        "link",
        forceLink<NodeDatum, LinkDatum>(links)
          .id((d) => d.id)
          .distance(forceParams.linkDistance)
          .strength(0.3)
      )
      .force(
        "charge",
        forceManyBody()
          .strength(forceParams.chargeStrength * 0.6)
          .distanceMax(width * 0.6)
      )
      .force("center", forceCenter(0, 0).strength(0.01))
      .force("collision", forceCollide().radius(forceParams.collisionRadius).strength(0.7))
      .alphaDecay(0.01)
      .velocityDecay(0.6);

    simulationRef.current = simulation;

    // Optimized pre-simulation
    simulation.alpha(0.1).restart();
    for (let i = 0; i < 30; ++i) simulation.tick();
    // Don't set alpha to 0 - let it decay naturally for smooth movement

    // Create SVG with optimized structure
    const svg = create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    // Optimized filter creation
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
      .attr("stdDeviation", "3")
      .attr("result", "coloredBlur");
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    const g = svg.append("g");

    // Optimized link rendering
    const link = g
      .append("g")
      .attr("stroke", "#666")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", (d) => Math.sqrt(d.value || 1) * (isMobile ? 0.8 : 1.8));

    // Optimized node rendering
    const node = g
      .append("g")
      .attr("stroke-width", 1.5)
      .selectAll<SVGGElement, NodeDatum>("g")
      .data(nodes)
      .join("g")
      .attr("class", "node")
      .attr("data-id", (d) => d.id)
      .style("cursor", isMobile ? "default" : "pointer");

    // Optimized scalable elements
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
      .style("font-size", nodeStyles.getFontSize)
      .style("font-family", "Apple Color Emoji, sans-serif")
      .style("pointer-events", "none")
      .attr("fill", "#ffffff");

    // Conditional label rendering
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

    // Optimized drag handlers with useCallback
    const dragBehavior = drag<SVGGElement, NodeDatum>()
      .on("start", (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on("drag", (event, d) => {
        d.fx = event.x;
        d.fy = event.y;

        if (activePopupNodeIdRef.current && d.id === activePopupNodeIdRef.current) {
          handlePopupMove(event.x, event.y);
        }
      })
      .on("end", (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    node.call(dragBehavior);

    // Remove drift effect for smoother movement
    // The natural forces should provide enough movement without additional jitter

    // Optimized golden marker
    const goldenMarker = g
      .append("circle")
      .attr("r", isMobile ? 3 : 4)
      .attr("fill", "gold")
      .style("pointer-events", "none")
      .style("opacity", 0);

    const goldenPathSequence = defaultNodes
      .sort((a, b) => Number(a.id) - Number(b.id))
      .map((node) => node.id);
    let currentIndex = 0;
    let activeGolden = {
      sourceId: "",
      targetId: "",
      startTime: 0,
      duration: 2000,
      inProgress: false,
      lingerTriggered: false,
    };

    let initialNodeHandled = false;
    let initialNodeStartTime = 0;
    let hasExploded = false;

    const startGoldenMarker = () => {
      let animationId: number;

      const animate = () => {
        if (!activeGolden.inProgress) {
          if (!initialNodeHandled) {
            const initialNode = nodes.find((n) => n.id === goldenPathSequence[0]);

            if (initialNode && initialNode.x != null && initialNode.y != null) {
              if (initialNodeStartTime === 0) {
                initialNodeStartTime = Date.now();
                goldenMarker
                  .attr("cx", initialNode.x)
                  .attr("cy", initialNode.y)
                  .style("opacity", 0);

                const initialNodeSelection = select(`[data-id="${goldenPathSequence[0]}"]`)
                  .select("circle");
                initialNodeSelection.attr("stroke", "gold").attr("stroke-width", isMobile ? 2 : 4);

                handlePopupRequest(
                  initialNode,
                  initialNode.x!,
                  (initialNode?.y ?? 0) - getNodeRadius(initialNode)
                );
              }

              if (Date.now() - initialNodeStartTime < lingerDuration) {
                animationId = requestAnimationFrame(animate);
                return;
              }

              initialNodeHandled = true;
              const initialNodeSelection = select(`[data-id="${goldenPathSequence[0]}"]`)
                .select("circle");
              initialNodeSelection.attr("stroke", "#555").attr("stroke-width", isMobile ? 1 : 1.5);
            }
          }

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

            const sx = x1 + (dx / distance) * r1;
            const sy = y1 + (dy / distance) * r1;
            const ex = x2 - (dx / distance) * r2;
            const ey = y2 - (dy / distance) * r2;

            const markerX = sx + t * (ex - sx);
            const markerY = sy + t * (ey - sy);
            goldenMarker.attr("cx", markerX).attr("cy", markerY);

            if (t === 1 && !activeGolden.lingerTriggered) {
              activeGolden.lingerTriggered = true;
              goldenMarker.style("opacity", 0);

              const targetNodeSelection = select(`[data-id="${activeGolden.targetId}"]`)
                .select("circle");
              targetNodeSelection.attr("stroke", "gold").attr("stroke-width", isMobile ? 2 : 4);

              handlePopupRequest(targetNode, targetNode.x, targetNode.y - getNodeRadius(targetNode) - 20);

              timeout(() => {
                targetNodeSelection.attr("stroke", "#555").attr("stroke-width", isMobile ? 1 : 1.5);
                activeGolden.inProgress = false;
                activeGolden.lingerTriggered = false;
              }, lingerDuration);
            }
          }
        }

        animationId = requestAnimationFrame(animate);
      };

      animationId = requestAnimationFrame(animate);

      // Store the animation ID for cleanup
      goldenTimerRef.current = {
        stop: () => {
          if (animationId) {
            cancelAnimationFrame(animationId);
          }
        }
      };

      return goldenTimerRef.current;
    };

    // Optimized simulation tick with reduced DOM updates
    simulation.on("tick", () => {
      // Batch DOM updates
      const transforms: string[] = [];
      for (let i = 0; i < nodes.length; i++) {
        const d = nodes[i];
        transforms[i] = `translate(${d.x}, ${d.y})`;
      }

      node.attr("transform", (d, i) => transforms[i]);

      // Only update popup position if needed
      if (activePopupNodeIdRef.current) {
        const activeNode = nodes.find((n) => n.id === activePopupNodeIdRef.current);
        if (activeNode && activeNode.x != null && activeNode.y != null) {
          handlePopupMove(activeNode.x, activeNode.y);
        }
      }

      // Check for golden marker start only occasionally
      if (!hasExploded && simulation.alpha() < 0.02 && isGraphSpreadOut(nodes)) {
        hasExploded = true;
        goldenTimerRef.current = startGoldenMarker();
      }

      // Smoother boundary constraints with damping
      const halfWidth = width / 2;
      const halfHeight = height / 2;
      for (let i = 0; i < nodes.length; i++) {
        const d = nodes[i];
        if (d.x == null || d.y == null || d.vx == null || d.vy == null) continue;
        const r = getNodeRadius(d);

        // Use softer boundary constraints with damping
        if (d.x - r < -halfWidth) {
          d.x = -halfWidth + r;
          d.vx *= -0.8; // Damping instead of full reversal
        } else if (d.x + r > halfWidth) {
          d.x = halfWidth - r;
          d.vx *= -0.8;
        }

        if (d.y - r < -halfHeight) {
          d.y = -halfHeight + r;
          d.vy *= -0.8;
        } else if (d.y + r > halfHeight) {
          d.y = halfHeight - r;
          d.vy *= -0.8;
        }
      }

      // Optimized link updates
      link
        .attr("x1", (d) => (d.source as NodeDatum).x!)
        .attr("y1", (d) => (d.source as NodeDatum).y!)
        .attr("x2", (d) => (d.target as NodeDatum).x!)
        .attr("y2", (d) => (d.target as NodeDatum).y!);
    });

    // Append SVG to container
    if (containerRef.current) {
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(svg.node() as Node);
    }

    // Cleanup
    return () => {
      if (goldenTimerRef.current) {
        goldenTimerRef.current.stop();
      }
      if (simulationRef.current) {
        simulationRef.current.stop();
      }
    };
  }, [width, height]); // Only recreate when dimensions change

  return <div ref={containerRef} />;
};

export default ForceGraph;
