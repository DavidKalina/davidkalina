"use client";

import { Outlines, RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { ContactSmudge, useCrank } from "../craft";
import { OUTLINE_COLOR, OUTLINE_WIDTH, toonSkin } from "../toon";

/**
 * AI DOCUMENT PROCESSING PIPELINE — THE LATTICE.
 *
 * One idea, held still: a page of unstructured text becomes a TYPED TREE, and
 * the tree lifts off the page.
 *
 * Chosen over three models of the SYSTEM — a machine with paper going through
 * it, a queue fanned out over workers, a mill grinding tokens down to a
 * fiftieth. All three were true and all three were diagrams: a box with an
 * arrow through it is what every pipeline on the internet looks like, and a
 * hero has about two seconds to be a specific thing rather than a category.
 *
 * So this one models the TRANSFORMATION instead — the sentence "structured
 * outputs turn the page image into typed shipment JSON", with nothing else in
 * the frame. No tray, no queue, no monitor. A sheet standing in a slot, a
 * gantry that rides up it, and a scan bar on the gantry.
 *
 * IT HAPPENS IN THREE MOVES, and the bar's height is the only clock:
 *
 *   above the bar   the page is ink. Grey, ragged, unread;
 *   at the bar      a field is FOUND — a tinted box snaps round a span of that
 *                   line and flashes as it lands;
 *   below the bar   the value the box caught has left the page, standing a
 *                   quarter unit proud as a node in the tree, in the box's own
 *                   colour.
 *
 * The ink itself is never deleted, only demoted. A reader that erased the
 * document as it went would be a shredder; this one leaves the page intact and
 * marked up, which is what an extraction actually is — the source still exists,
 * and you can see exactly where each field came from.
 *
 * THE LIFT IS THE ARGUMENT. The nodes do not fade in on the page — they detach
 * from it. Flat, this is a diagram of a diagram; lifted, the turntable has
 * something to show you, and the tinted box left behind on the paper is the
 * receipt.
 *
 * IT IS PRINTED ON BOTH SIDES, and that is not decoration. This model lives on
 * a turntable that goes all the way round, and a single-sided page is a picture
 * for a third of that turn, a sliver for a moment, and a blank sheet of paper
 * for the rest of it — the one thing the model has to say is invisible from
 * behind. So the whole markup — ink, boxes, tree — is rendered twice, the back
 * face a half-turn about the page's own axis, exactly as a two-sided sign is
 * made. Both faces read the same bar, because both derive from the same crank,
 * so there is no state to keep in step.
 *
 * That leaves one angle: edge-on, where a page is a line. The gantry is real
 * geometry and keeps riding whatever the yaw, and the page's EDGE carries a tab
 * per field that lights as it is found — a thumb index. At ninety degrees the
 * document is gone and you can still see the reader working and count what it
 * has got.
 *
 * The sweep is a PING-PONG, not a loop. Drag one way and the page resolves;
 * drag back and it dissolves into text again, at exactly the rate of your hand.
 * A model that could only run forwards would be an animation with a scrubber
 * bolted to it. This one is reversible, which is what makes it feel like a
 * control rather than a playback.
 */

/** Radians of plinth for one full sweep of the page. A little under a turn:
 *  two flicks, or one deliberate drag, to resolve the whole document. */
const SWEEP = Math.PI * 1.5;

const BODY = "#2b2b24";
const SHELL = "#3a382d";
const DECK = "#191913";
const PAPER = "#e8e8e0";

/**
 * FIELD TINTS, and the one rule that keeps four colours from becoming a mess:
 * the accent belongs to the MACHINE — the bar, the gantry's readout, the
 * plinth's ring — and the tints belong to the DATA. Nothing on the reader is
 * ever tinted, and nothing extracted is ever plain accent unless its type says
 * gold. So a project swap still repaints the model's chrome, and the page's
 * markup stays the same four colours because a date is a date on any deck.
 *
 * All four are already in the site: signal, the cold rim blue the whole render
 * is lit by, destructive, and bone. A fifth would be a palette; four is a key.
 */
const TINTS = ["#e5a93a", "#7fa8d8", "#c8553a", "#d8d8cf"] as const;

/** The page. Half-extents, because every mark on it is placed in those units. */
const PAGE_W = 0.6;
const PAGE_H = 0.78;
/** The page's centre, in world y. */
const PAGE_Y = 1.06;
/** How far the gantry's posts are outboard of the page edge. */
const POST_X = 0.86;
/** The page's left margin, which every line hangs off. */
const MARGIN = -PAGE_W + 0.08;

/** Ink: eight lines of nothing in particular, ragged. */
const LINE_WIDTHS = [0.9, 0.72, 0.84, 0.5, 0.78, 0.64, 0.86, 0.44];
const LINES = LINE_WIDTHS.map((w, i) => ({
  y: PAGE_H - 0.13 - i * 0.175,
  w: w * PAGE_W,
}));

/**
 * WHAT THE READER FINDS.
 *
 * Each entry is one field: the span of ink it is drawn round, the tint of its
 * type, and where it ends up in the tree. `line` rather than a raw y so a box
 * can never drift off the text it is supposed to have caught — the page's
 * leading is the layout, and a highlight floating between two lines is the one
 * artefact that would give away that these are unrelated rectangles.
 *
 * The node sits at its field's own height on purpose. The box and the value
 * that came out of it resolve on the same frame, at the same place, in the same
 * colour; the only difference between them by the end is that one is a quarter
 * unit closer to you. That is the whole transformation, said once.
 *
 * `parent` indices point backwards only, so a node's elbow can be drawn from
 * data already in the array — a tree that needed two passes to lay out would be
 * a layout engine, and this is seven rectangles.
 */
const FIELDS: ReadonlyArray<{
  line: number;
  /** The span of the line the box encloses, in page-local x. */
  from: number;
  to: number;
  tint: number;
  /** Where the value lands in the tree: indent, and its bar's length. */
  nodeX: number;
  nodeW: number;
  parent: number;
}> = [
  { line: 0, from: -0.3, to: 0.0, tint: 0, nodeX: -0.46, nodeW: 0.3, parent: -1 },
  { line: 1, from: -0.34, to: -0.1, tint: 1, nodeX: -0.3, nodeW: 0.24, parent: 0 },
  { line: 2, from: -0.44, to: -0.12, tint: 0, nodeX: -0.3, nodeW: 0.34, parent: 0 },
  { line: 3, from: -0.46, to: -0.26, tint: 2, nodeX: -0.12, nodeW: 0.22, parent: 2 },
  { line: 4, from: -0.3, to: -0.06, tint: 3, nodeX: -0.12, nodeW: 0.3, parent: 2 },
  { line: 6, from: -0.4, to: -0.02, tint: 1, nodeX: -0.3, nodeW: 0.2, parent: 0 },
  { line: 7, from: -0.5, to: -0.3, tint: 2, nodeX: -0.12, nodeW: 0.26, parent: 5 },
];

/** The fields, resolved into geometry once — every consumer below wants the
 *  centre and the width, and none of them should be recomputing it. */
const MARKS = FIELDS.map((field) => ({
  ...field,
  y: LINES[field.line].y,
  cx: (field.from + field.to) / 2,
  w: field.to - field.from,
  color: TINTS[field.tint],
}));

/** Half-height of a detection box. A shade taller than the ink it encloses, so
 *  the box reads as drawn ROUND the text rather than struck through it. */
const MARK_H = 0.034;
/** How far a resolved node stands off the page. */
const LIFT = 0.24;

function pingPong(u: number) {
  const f = ((u % 2) + 2) % 2;
  return f > 1 ? 2 - f : f;
}

/**
 * How far the page has been read, and where the bar is on it — the model's only
 * clock, derived and never stored.
 *
 * Shared rather than duplicated because three separate things now read it: the
 * gantry, and both faces of the page. Two copies of this arithmetic is two
 * places for the front and the back of the same sheet to disagree about what
 * has been scanned, which is a bug you would only ever catch mid-turn.
 */
function readAt(travel: number) {
  const t = pingPong(travel / SWEEP);
  return { t, scan: THREE.MathUtils.lerp(-PAGE_H - 0.04, PAGE_H + 0.04, t) };
}

/** How far a detection has resolved into a node, 0..1. */
function resolvedAt(scan: number, y: number) {
  return THREE.MathUtils.smoothstep(scan, y - 0.02, y + 0.12);
}

/** How far a field has been found, 0..1. Found before it is resolved: the box
 *  lands on the paper, and the value leaves it a moment later. */
function foundAt(scan: number, y: number) {
  return THREE.MathUtils.smoothstep(scan, y - 0.03, y + 0.06);
}

/**
 * ONE FACE OF THE PAGE — the ink, the detections, and the tree that comes out
 * of them. Rendered twice by the model below: once forward, once a half-turn
 * about the page's axis.
 *
 * A component rather than a function returning JSX because each face owns its
 * own refs and its own frame loop. The alternative — one loop reaching into two
 * sets of arrays — is the same code with an index threaded through it, and the
 * index would be load-bearing for nothing: both faces are the same page.
 */
function PageFace() {
  const crank = useCrank();

  const lines = useRef<(THREE.Mesh | null)[]>([]);
  const marks = useRef<(THREE.Group | null)[]>([]);
  const fills = useRef<(THREE.Mesh | null)[]>([]);
  const nodes = useRef<(THREE.Group | null)[]>([]);

  useFrame(() => {
    const { scan } = readAt(crank.current.travel);

    // INK. Demoted below the bar, not deleted: what the reader has been over is
    // still on the page, just no longer the thing you are meant to be looking
    // at. The band is narrow — a long fade reads as the page being dimmed
    // rather than as a line being read.
    LINES.forEach((line, i) => {
      const mesh = lines.current[i];
      if (!mesh) return;
      const read = THREE.MathUtils.smoothstep(scan, line.y - 0.05, line.y + 0.05);
      (mesh.material as THREE.MeshBasicMaterial).opacity = THREE.MathUtils.lerp(0.5, 0.16, read);
    });

    // DETECTIONS. The box snaps round its span slightly under width and lands
    // at full width, with a flash as it lands — a highlight that simply fades
    // up reads as a colour wash on the paper, and the point is that something
    // was FOUND, at an instant, by a machine that is looking.
    MARKS.forEach((mark, i) => {
      const group = marks.current[i];
      const fill = fills.current[i];
      if (!group) return;
      const found = foundAt(scan, mark.y);
      group.visible = found > 0.01;
      group.scale.set(0.84 + found * 0.16, 1, 1);
      // Peaks halfway through the snap and is gone by the end of it.
      const flash = found * (1 - found) * 4;
      if (fill) {
        (fill.material as THREE.MeshBasicMaterial).opacity = found * 0.2 + flash * 0.26;
      }
      // The bracket: solid the moment it lands, then settling back to a mark
      // that is still legible but no longer shouting.
      group.children.forEach((child) => {
        if (child === fill) return;
        const material = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
        material.opacity = found * 0.55 + flash * 0.45;
      });
    });

    // STRUCTURE. Resolved over a slightly wider band than a field is found
    // over, so for a moment the box and the node it produced are both at the
    // bar — which is the one frame that actually says one became the other.
    MARKS.forEach((mark, i) => {
      const group = nodes.current[i];
      if (!group) return;
      const resolved = resolvedAt(scan, mark.y);
      group.visible = resolved > 0.01;
      group.position.z = 0.016 + resolved * LIFT;
      // Arriving slightly under scale as well as under lift: a node that only
      // moves toward you reads as a zoom, and one that also settles in size
      // reads as a thing being assembled.
      group.scale.setScalar(0.72 + resolved * 0.28);
      group.children.forEach((child) => {
        const material = (child as THREE.Mesh).material as THREE.MeshBasicMaterial | undefined;
        if (material && "opacity" in material) material.opacity = resolved * 0.92;
      });
    });
  });

  return (
    <group>
      {/* INK. Left-ragged, hanging off a common left margin. */}
      {LINES.map((line, i) => (
        <mesh
          key={i}
          ref={(node) => {
            lines.current[i] = node;
          }}
          position={[MARGIN + line.w / 2, line.y, 0.011]}
        >
          <planeGeometry args={[line.w, 0.038]} />
          <meshBasicMaterial color="#8f8f86" transparent opacity={0.5} />
        </mesh>
      ))}

      {/* DETECTIONS, on the paper. A wash plus four rules: the wash alone is a
          marker pen, and the corners are what make it an instrument's finding.
          Drawn a hair in front of the ink and well behind where the node ends
          up, so the box stays ON the page while its value leaves. */}
      {MARKS.map((mark, i) => (
        <group
          key={i}
          ref={(node) => {
            marks.current[i] = node;
          }}
          position={[mark.cx, mark.y, 0.0125]}
          visible={false}
        >
          <mesh
            ref={(node) => {
              fills.current[i] = node;
            }}
          >
            <planeGeometry args={[mark.w, MARK_H * 2]} />
            <meshBasicMaterial color={mark.color} transparent opacity={0} depthWrite={false} />
          </mesh>
          {/* Top and bottom rules. */}
          {[MARK_H, -MARK_H].map((y) => (
            <mesh key={y} position={[0, y, 0.001]}>
              <planeGeometry args={[mark.w, 0.007]} />
              <meshBasicMaterial color={mark.color} transparent opacity={0} />
            </mesh>
          ))}
          {/* End stops. Thicker than the rules, because the ends are what say
              where the field STOPS — which is the only judgement the reader is
              making that you can check against the ink underneath. */}
          {[mark.w / 2, -mark.w / 2].map((x) => (
            <mesh key={x} position={[x, 0, 0.001]}>
              <planeGeometry args={[0.009, MARK_H * 2]} />
              <meshBasicMaterial color={mark.color} transparent opacity={0} />
            </mesh>
          ))}
        </group>
      ))}

      {/* STRUCTURE, off the paper. Each node is a chip, a value bar, and the
          elbow back to its parent — the elbow is what makes seven chips a TREE
          rather than an indented list, and an indented list is just the text
          again. Each carries its field's tint, so the thing standing in front
          of the page and the box left on it are visibly the same record. */}
      {MARKS.map((mark, i) => {
        const parent = mark.parent >= 0 ? MARKS[mark.parent] : null;
        return (
          <group
            key={i}
            ref={(el) => {
              nodes.current[i] = el;
            }}
            visible={false}
          >
            <mesh position={[mark.nodeX, mark.y, 0]}>
              <planeGeometry args={[0.05, 0.05]} />
              <meshBasicMaterial color={mark.color} transparent opacity={0} />
            </mesh>
            <mesh position={[mark.nodeX + 0.045 + mark.nodeW / 2, mark.y, 0]}>
              <planeGeometry args={[mark.nodeW, 0.03]} />
              <meshBasicMaterial color={mark.color} transparent opacity={0} />
            </mesh>
            {parent && (
              <>
                {/* Drawn in the PARENT's tint: an edge belongs to the branch it
                    hangs off, and edges in the child's colour turn the spine of
                    the tree into a barber's pole. */}
                <mesh position={[parent.nodeX, (parent.y + mark.y) / 2, 0]}>
                  <planeGeometry args={[0.008, Math.abs(parent.y - mark.y)]} />
                  <meshBasicMaterial color={parent.color} transparent opacity={0} />
                </mesh>
                <mesh position={[(parent.nodeX + mark.nodeX) / 2, mark.y, 0]}>
                  <planeGeometry args={[Math.abs(mark.nodeX - parent.nodeX), 0.008]} />
                  <meshBasicMaterial color={parent.color} transparent opacity={0} />
                </mesh>
              </>
            )}
          </group>
        );
      })}
    </group>
  );
}

export function DocLattice({ accent }: { accent: THREE.Color }) {
  const crank = useCrank();

  const body = toonSkin({ color: BODY, rim: 0.18 });
  const shell = toonSkin({ color: SHELL, rim: 0.22 });
  const deck = toonSkin({ color: DECK, ramp: "flat", rim: 0.1 });
  const paper = toonSkin({ color: PAPER, ramp: "flat", rim: 0.12 });

  const gantry = useRef<THREE.Group>(null);
  const beams = useRef<(THREE.Mesh | null)[]>([]);
  const glows = useRef<(THREE.Mesh | null)[]>([]);
  const tabs = useRef<(THREE.Mesh | null)[]>([]);
  const readouts = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(() => {
    const { travel, rate } = crank.current;
    const { t, scan } = readAt(travel);
    const load = Math.min(1, Math.abs(rate) / 1.6);

    if (gantry.current) gantry.current.position.y = PAGE_Y + scan;
    beams.current.forEach((mesh) => {
      if (mesh) (mesh.material as THREE.MeshBasicMaterial).opacity = 0.7 + load * 0.3;
    });
    glows.current.forEach((mesh) => {
      if (mesh) (mesh.material as THREE.MeshBasicMaterial).opacity = 0.06 + load * 0.16;
    });

    // THE EDGE INDEX. Two tabs per field, one on each edge of the sheet, so
    // whichever way the turntable has the page there is a tally you can read —
    // including at the one yaw where the document itself is a line.
    MARKS.forEach((mark, i) => {
      const found = foundAt(scan, mark.y);
      const opacity = 0.1 + found * 0.85;
      const left = tabs.current[i * 2];
      const right = tabs.current[i * 2 + 1];
      if (left) (left.material as THREE.MeshBasicMaterial).opacity = opacity;
      if (right) (right.material as THREE.MeshBasicMaterial).opacity = opacity;
    });

    // The pedestal's one instrument: how much of the page is typed. On both
    // faces, for the same reason the page is.
    readouts.current.forEach((mesh) => {
      if (!mesh) return;
      mesh.scale.x = Math.max(0.02, t);
      mesh.position.x = -0.34 + (mesh.scale.x * 0.68) / 2;
    });
  });

  return (
    // Off-square, always. Head-on the page is a rectangle and the lift — the
    // only thing this variant has to say — is invisible.
    <group rotation={[0, 0.34, 0]}>
      <ContactSmudge radius={2.1} opacity={0.62} scale={[1, 0.62]} />

      {/* THE BASE. A slot, not a stand: the page is HELD, and a page that is
          held is a document under examination rather than a poster. */}
      <RoundedBox args={[2.3, 0.16, 0.9]} radius={0.03} smoothness={2} position={[0, 0.08, 0]} material={deck} castShadow receiveShadow>
        <Outlines thickness={OUTLINE_WIDTH} color={OUTLINE_COLOR} />
      </RoundedBox>
      <RoundedBox args={[1.5, 0.12, 0.3]} radius={0.03} smoothness={2} position={[0, 0.21, 0]} material={shell} castShadow receiveShadow>
        <Outlines thickness={OUTLINE_WIDTH} color={OUTLINE_COLOR} />
      </RoundedBox>
      {/* The progress strip, on both faces of the pedestal. Machine chrome, so
          it stays in the deck's accent while the page's markup does not. */}
      {[0, Math.PI].map((yaw, face) => (
        <group key={face} position={[0, 0.11, 0]} rotation={[0, yaw, 0]}>
          <mesh position={[0, 0, 0.452]}>
            <planeGeometry args={[0.72, 0.05]} />
            <meshBasicMaterial color="#0a0a0c" />
          </mesh>
          <mesh
            ref={(node) => {
              readouts.current[face] = node;
            }}
            position={[-0.34, 0, 0.454]}
          >
            <planeGeometry args={[0.68, 0.026]} />
            <meshBasicMaterial color={accent} transparent opacity={0.9} />
          </mesh>
        </group>
      ))}

      {/* THE POSTS the gantry rides. */}
      {[POST_X, -POST_X].map((x) => (
        <mesh key={x} position={[x, PAGE_Y - 0.06, 0]} material={body} castShadow receiveShadow>
          <boxGeometry args={[0.1, 1.9, 0.14]} />
          <Outlines thickness={OUTLINE_WIDTH} color={OUTLINE_COLOR} />
        </mesh>
      ))}

      {/* THE PAGE, and the same page again on the back of it. */}
      <mesh position={[0, PAGE_Y, 0]} material={paper} castShadow receiveShadow>
        <boxGeometry args={[PAGE_W * 2, PAGE_H * 2, 0.018]} />
        <Outlines thickness={OUTLINE_WIDTH} color={OUTLINE_COLOR} />
      </mesh>
      <group position={[0, PAGE_Y, 0]}>
        <PageFace />
        <group rotation={[0, Math.PI, 0]}>
          <PageFace />
        </group>

        {/* THE EDGE INDEX. Tabs standing proud of both long edges, at each
            field's own height — solid little blocks, not planes, because the
            angle they exist for is the one where a plane has no width. */}
        {MARKS.map((mark, i) =>
          [PAGE_W + 0.014, -PAGE_W - 0.014].map((x, side) => (
            <mesh
              key={`${i}-${side}`}
              ref={(node) => {
                tabs.current[i * 2 + side] = node;
              }}
              position={[x, mark.y, 0]}
            >
              <boxGeometry args={[0.028, 0.05, 0.03]} />
              <meshBasicMaterial color={mark.color} transparent opacity={0.1} />
            </mesh>
          )),
        )}
      </group>

      {/* THE GANTRY. Rides the posts, carries the bar. Modelled as a real
          crossbeam with end blocks because a bare glowing line sliding up a
          page is a Photoshop layer; a beam with carriages on it is a machine
          doing the reading — and it is the one part still visible edge-on, so
          it is what keeps the model alive through the whole turn.

          It STRADDLES the page: a crossbeam and a bar on each side, rather than
          a carriage that only exists in front. Asymmetric, the back of this
          model would show a bare page being read by nothing. */}
      <group ref={gantry} position={[0, PAGE_Y, 0]}>
        {[POST_X, -POST_X].map((x) => (
          <mesh key={x} position={[x, 0, 0]} material={shell} castShadow>
            <boxGeometry args={[0.16, 0.16, 0.26]} />
            <Outlines thickness={OUTLINE_WIDTH} color={OUTLINE_COLOR} />
          </mesh>
        ))}
        {[0.1, -0.1].map((z, face) => (
          <group key={face}>
            <mesh position={[0, 0, z]} material={body} castShadow>
              <boxGeometry args={[POST_X * 2 - 0.1, 0.07, 0.09]} />
              <Outlines thickness={OUTLINE_WIDTH} color={OUTLINE_COLOR} />
            </mesh>
            {/* The bar itself, in front of the page and unlit — the only
                emissive thing on the reader, and it should read as the source.
                In the deck's accent, never in a field tint: the light does not
                know what it is about to find. */}
            <mesh
              ref={(node) => {
                beams.current[face] = node;
              }}
              position={[0, 0, z * 0.45]}
            >
              <planeGeometry args={[PAGE_W * 2 + 0.06, 0.012]} />
              <meshBasicMaterial color={accent} transparent opacity={0.8} side={THREE.DoubleSide} />
            </mesh>
            <mesh
              ref={(node) => {
                glows.current[face] = node;
              }}
              position={[0, 0, z * 0.42]}
            >
              <planeGeometry args={[PAGE_W * 2 + 0.3, 0.16]} />
              <meshBasicMaterial color={accent} transparent opacity={0.12} depthWrite={false} side={THREE.DoubleSide} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}
