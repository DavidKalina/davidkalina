"use client";

import { Outlines } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import {
  ContactSmudge,
  DASH_ALPHA,
  facet,
  randRange,
  ribbonGeometry,
  useCrank,
} from "../craft";
import { OUTLINE_COLOR, OUTLINE_WIDTH, toonSkin } from "../toon";

/**
 * ROUTE KING — a terraced mountain with one road up it, and a board on the road.
 *
 * The app is about riding a route and holding the fastest time on it, so the
 * subject is the CLIMB, and the vehicle on it is kept small enough to stay a
 * detail of the road rather than the thing being modelled. It is a longboard,
 * which is what the app is actually for, and a longboard survives the scale in
 * a way a bicycle does not: spokes and a frame are the two things that read as
 * noise once the whole model is 300px tall, where a deck and four wheels are
 * still four solid shapes.
 *
 * The terraces are the model's whole argument. They are contour lines made
 * solid — the shape a route looks like on the map you actually plan it on — and
 * they give a cel-shaded silhouette something to do from every angle the
 * turntable can reach, which a smooth cone does not.
 *
 * Everything here derives from one profile and one curve. Move a level and the
 * mountain, the road on it, the contour rings and the scenery all move together,
 * because none of them carry their own copy of where anything is.
 */

/**
 * The mountain, as radius at height, bottom to top. Not a linear taper: the
 * lower terraces are wide and shallow and the upper ones pinch, which is what
 * makes a hill read as EARTH rather than as a stack of coasters.
 */
const LEVELS = [
  { y: 0.0, r: 1.98 },
  { y: 0.3, r: 1.62 },
  { y: 0.58, r: 1.26 },
  { y: 0.84, r: 0.9 },
  { y: 1.06, r: 0.54 },
  { y: 1.24, r: 0.24 },
];

/** Radians of road per terrace. Under a full turn each, so the road is always
 *  entering and leaving the far side — you have to turn the plinth to see where
 *  it goes, which is the point of a turntable. */
const TERRACE_SWEEP = 2.35;
/** Angular length of the ramp linking one terrace to the next. Short: a ramp
 *  as long as a terrace reads as a helix, and a helix is a car park. */
const RAMP_SWEEP = 0.62;

/**
 * How far the plinth must be turned, in radians, for the rider to go from the
 * start gate to the crown.
 *
 * Set against what a hand actually does, not against what sounds right. At the
 * drag sensitivity this hero uses, a full turn is about five hundred pixels of
 * dragging and a decent flick is worth a couple of radians — so two full turns,
 * which was the first guess, is six flicks to see the top of your own model.
 * This is a shade under a turn: two flicks, or one deliberate drag.
 */
const CLIMB = Math.PI * 1.8;

const STONE = "#46432f";
const ROAD = "#22221b";
const PINE = "#2c3826";

/** The rider's nose in his own frame, for the tangent-to-quaternion swing. */
const FORWARD = new THREE.Vector3(0, 0, 1);

function polar(radius: number, y: number, theta: number) {
  return new THREE.Vector3(Math.cos(theta) * radius, y, Math.sin(theta) * radius);
}

/** Ping-pong, so the rider turns round at the top and rides back down rather
 *  than teleporting to the bottom. A wrap here would be the one hard cut in a
 *  model that is otherwise entirely continuous with the user's hand. */
function pingPong(u: number) {
  const f = ((u % 2) + 2) % 2;
  return f > 1 ? 2 - f : f;
}

export function RouteKing({ accent }: { accent: THREE.Color }) {
  const crank = useCrank();

  /** The hill. Lathed from the level profile and then faceted — the facets are
   *  doing real work here, catching the key at fifteen different angles on what
   *  is otherwise one continuous surface of revolution. */
  const mountain = useMemo(() => {
    const profile: THREE.Vector2[] = [new THREE.Vector2(LEVELS[0].r, LEVELS[0].y)];
    for (let k = 0; k < LEVELS.length - 1; k++) {
      // Up the wall of this level, then in across the terrace it holds up.
      profile.push(new THREE.Vector2(LEVELS[k].r, LEVELS[k + 1].y));
      profile.push(new THREE.Vector2(LEVELS[k + 1].r, LEVELS[k + 1].y));
    }
    profile.push(new THREE.Vector2(0, LEVELS[LEVELS.length - 1].y));
    // Fifteen, an odd number, so no two facets are ever exactly opposite and
    // the silhouette never lands on a symmetry as the turntable comes round.
    return facet(new THREE.LatheGeometry(profile, 15));
  }, []);

  /** The road: onto the hill, then a terrace at a time to the summit.
   *
   *  Each terrace is walked at the mid-radius of its shelf — the crown of the
   *  ledge, where a road actually goes. The ramps between them are the part
   *  that has to be reasoned about rather than eyeballed: climbing means
   *  climbing INWARD, and a spline left to interpolate straight from one shelf
   *  to the next crosses inside the wall it is climbing about halfway up, where
   *  the hill swallows it. So every ramp comes up hugging the outside of the
   *  wall and only turns in once it is over the lip. Four hundredths of
   *  clearance, which is less than the road is wide — so the uphill half of the
   *  carriageway is buried, and the ramp reads as a cutting.
   */
  const route = useMemo(() => {
    // The approach, on the plinth. Kept inside radius 2.4: the whole model
    // sweeps a circle as the turntable turns, and a road that starts at the
    // plinth's own 2.6 hangs over the edge for part of every revolution.
    const points: THREE.Vector3[] = [
      polar(2.4, 0.02, -1.18),
      polar(2.18, 0.06, -0.74),
      polar(2.03, 0.17, -0.44),
    ];
    let theta = -0.2;
    for (let k = 0; k < LEVELS.length - 1; k++) {
      // Over the lip of the wall just climbed.
      points.push(polar(LEVELS[k].r + 0.04, LEVELS[k + 1].y, theta));
      const radius = (LEVELS[k].r + LEVELS[k + 1].r) / 2;
      for (let s = 1; s <= 6; s++) {
        points.push(polar(radius, LEVELS[k + 1].y, theta + (s / 6) * TERRACE_SWEEP));
      }
      // Half way up the next wall, still outside it. This is the point that
      // stops the ramp from being a straight chord through the hill.
      if (k < LEVELS.length - 2) {
        points.push(
          polar(
            LEVELS[k + 1].r + 0.05,
            (LEVELS[k + 1].y + LEVELS[k + 2].y) / 2,
            theta + TERRACE_SWEEP + RAMP_SWEEP * 0.5,
          ),
        );
      }
      theta += TERRACE_SWEEP + RAMP_SWEEP;
    }
    // Curling in to the crown on the summit plateau.
    points.push(polar(0.12, LEVELS[LEVELS.length - 1].y, theta - RAMP_SWEEP + 0.55));
    // Slack tension, because the failure mode of a spline through waypoints on
    // a shelf is OVERSHOOT: at the standard 0.5 the road sags a centimetre and
    // a half below each terrace as it comes over the lip, and a road sunk into
    // the floor it is lying on is the one artefact you cannot explain away. At
    // 0.35 the worst dip is under a centimetre, which the ribbon's own lift
    // more than covers.
    return new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.35);
  }, []);

  // Three ribbons off one curve. Built separately rather than shared because
  // `setDrawRange` lives on the geometry, and the lit overlay needs its own.
  const roadbed = useMemo(() => ribbonGeometry(route, 240, 0.115, 0.022), [route]);
  const claimed = useMemo(() => ribbonGeometry(route, 240, 0.09, 0.03), [route]);
  const centreline = useMemo(() => ribbonGeometry(route, 240, 0.012, 0.038), [route]);

  const dashes = useMemo(() => {
    const texture = DASH_ALPHA.clone();
    texture.needsUpdate = true;
    texture.repeat.set(52, 1);
    return texture;
  }, []);

  /** Scenery. Placed in the arc of each terrace the road does NOT use, so
   *  nothing ever stands in the carriageway, and jittered off a seed so the
   *  spacing has no rhythm to it. */
  const scenery = useMemo(() => {
    const items: { position: THREE.Vector3; kind: "pine" | "rock"; size: number; spin: number }[] = [];
    for (let k = 0; k < LEVELS.length - 2; k++) {
      const roadStart = -0.2 + k * (TERRACE_SWEEP + RAMP_SWEEP);
      const free = Math.PI * 2 - TERRACE_SWEEP - RAMP_SWEEP;
      const count = 4 - Math.floor(k / 2);
      for (let i = 0; i < count; i++) {
        const seed = k * 31 + i * 7 + 3;
        const theta = roadStart + TERRACE_SWEEP + RAMP_SWEEP * 0.5 + randRange(seed, 0.15, 0.95) * free;
        const radius = randRange(seed + 101, LEVELS[k + 1].r + 0.13, LEVELS[k].r - 0.13);
        items.push({
          position: polar(radius, LEVELS[k + 1].y, theta),
          kind: randRange(seed + 202, 0, 1) > 0.32 ? "pine" : "rock",
          size: randRange(seed + 303, 0.82, 1.25),
          spin: randRange(seed + 404, 0, Math.PI * 2),
        });
      }
    }
    return items;
  }, []);

  /** The crown goes on the axis, not at the end of the road. A crown a tenth
   *  off the centre of its own summit does not read as a deliberate
   *  imperfection; it reads as a bug. */
  const summitY = LEVELS[LEVELS.length - 1].y;
  const gate = useMemo(() => ({ point: route.getPointAt(0.045), tangent: route.getTangentAt(0.045) }), [route]);

  const rider = useRef<THREE.Group>(null);
  const crown = useRef<THREE.Group>(null);

  // Scratch, reused every frame. Allocating a vector and a quaternion per frame
  // is how a sixty-hertz loop ends up sawtoothing the garbage collector.
  const scratch = useMemo(
    () => ({ position: new THREE.Vector3(), tangent: new THREE.Vector3(), quaternion: new THREE.Quaternion() }),
    [],
  );

  useFrame(() => {
    const { travel, rate } = crank.current;
    const t = pingPong(travel / CLIMB);

    if (rider.current) {
      route.getPointAt(t, scratch.position);
      route.getTangentAt(t, scratch.tangent).normalize();
      // Ride the way you are being turned: on the way back down the tangent
      // still points uphill, and an arrowhead pointing backwards down a descent
      // is the one thing that would give away that this is a curve lookup.
      if (pingPong((travel + 1e-3) / CLIMB) < t) scratch.tangent.negate();
      rider.current.position.copy(scratch.position);
      // The road surface, not the curve: the ribbon is lifted off it, and a
      // board that measures from the curve has its wheels inside the tarmac.
      rider.current.position.y += 0.03;
      scratch.quaternion.setFromUnitVectors(FORWARD, scratch.tangent);
      rider.current.quaternion.copy(scratch.quaternion);
      // Carve into the turn, proportional to how hard the plinth is being
      // driven. Clamped, and clamped harder than a dart needed to be: a board
      // past about fifteen degrees is a board on its side, not one leaning.
      rider.current.rotateZ(THREE.MathUtils.clamp(-rate * 0.07, -0.26, 0.26));
    }

    // The line he has drawn. Index count is six per segment, and the range must
    // land on a whole triangle or the last one is rendered with two vertices.
    const total = claimed.index!.count;
    claimed.setDrawRange(0, Math.max(0, Math.floor((total / 6) * t) * 6));

    // The crown only rises for whoever gets to the top. It is the model's one
    // reward and it is worth two full turns of the plinth to see it.
    if (crown.current) {
      const raised = THREE.MathUtils.smoothstep(t, 0.86, 1);
      crown.current.position.y = summitY + 0.16 + raised * 0.22;
      crown.current.scale.setScalar(0.35 + raised * 0.65);
      crown.current.visible = raised > 0.001;
      crown.current.rotation.y = travel * 0.35;
    }
  });

  return (
    <group>
      {/* Radius 2.5 so the solid part of the smudge covers the hill's 1.98 base
          and the fade runs out just inside the plinth's rim. */}
      <ContactSmudge radius={2.5} opacity={0.7} />

      {/* THE HILL. */}
      <mesh geometry={mountain} material={toonSkin({ color: STONE, rim: 0.2 })} castShadow receiveShadow>
        <Outlines thickness={OUTLINE_WIDTH} color={OUTLINE_COLOR} />
      </mesh>

      {/* CONTOUR RINGS, on the lip of each terrace. The map the route was
          planned on, drawn back onto the hill. Bone and nearly transparent —
          loud enough to catch the terrace edges, quiet enough not to become
          the model's subject. */}
      {LEVELS.slice(1).map((level, i) => (
        <mesh key={i} position={[0, level.y + 0.004, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[LEVELS[i].r - 0.05, LEVELS[i].r - 0.015, 48]} />
          <meshBasicMaterial color="#d8d8cf" transparent opacity={0.16} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* THE ROAD, in three layers: the bed, the line already ridden, and the
          markings. The bed is deliberately darker than the hill — a road that
          is lighter than the ground it is cut into reads as a ribbon lying on
          top of the model rather than as something carved into it. */}
      <mesh geometry={roadbed} material={toonSkin({ color: ROAD, ramp: "flat", rim: 0.08 })} receiveShadow />
      <mesh geometry={claimed}>
        <meshBasicMaterial color={accent} transparent opacity={0.85} />
      </mesh>
      <mesh geometry={centreline}>
        <meshBasicMaterial
          color="#d8d8cf"
          alphaMap={dashes}
          transparent
          // Cut rather than blended: a dash with soft ends is a dotted line
          // seen through fog, and this is a painted marking.
          alphaTest={0.5}
          opacity={0.55}
        />
      </mesh>

      {/* THE START GATE. Where a segment begins — the one piece of signage on
          the mountain, so it has to be the thing you look for. */}
      <group position={gate.point} rotation={[0, Math.atan2(gate.tangent.x, gate.tangent.z), 0]}>
        {/* Feet on the road, not floating over it: the half-torus is drawn from
            its centre, so the centre goes on the ground and the arc is what
            stands up. */}
        <mesh position={[0, 0.02, 0]} castShadow>
          <torusGeometry args={[0.2, 0.018, 6, 20, Math.PI]} />
          <meshBasicMaterial color={accent} />
        </mesh>
      </group>

      {/* SCENERY. */}
      {scenery.map((item, i) => (
        <group key={i} position={item.position} rotation={[0, item.spin, 0]} scale={item.size}>
          {item.kind === "pine" ? (
            <>
              <mesh position={[0, 0.06, 0]} castShadow>
                <cylinderGeometry args={[0.022, 0.03, 0.12, 5]} />
                <primitive object={toonSkin({ color: "#3a3226", rim: 0.1 })} attach="material" />
              </mesh>
              <mesh position={[0, 0.2, 0]} castShadow material={toonSkin({ color: PINE, rim: 0.12 })}>
                <coneGeometry args={[0.13, 0.26, 6]} />
              </mesh>
              <mesh position={[0, 0.34, 0]} castShadow material={toonSkin({ color: PINE, rim: 0.12 })}>
                <coneGeometry args={[0.095, 0.2, 6]} />
              </mesh>
            </>
          ) : (
            <mesh position={[0, 0.06, 0]} rotation={[0.4, 0, 0.25]} castShadow material={toonSkin({ color: "#3d3a31", rim: 0.16 })}>
              <dodecahedronGeometry args={[0.1, 0]} />
            </mesh>
          )}
        </group>
      ))}

      {/* THE RIDER — a longboard, riderless.
          The app is for electric longboarders, and a board is the one silhouette
          that says so: long, narrow, kicked at both ends, nothing like the dart
          that was here before or the bike the mountain already argues against.
          No figure on it. A person at this scale is four grey pixels and a
          posture you cannot read, and an empty board carving a line is the
          cleaner claim anyway — the segment belongs to whoever is not here.

          Built along +Z, because that is the nose the tangent swing points down
          the road. Everything is measured off the wheels: they touch at local
          zero, so the group can sit on the road surface and the deck floats the
          right distance over it without a second fudge factor. */}
      <group ref={rider}>
        {/* THE DECK, in three planks. A single box is a plank, and a plank on
            wheels is a scooter; the kicks at each end are what make it a
            board. Bone, so it stays the brightest thing on a dark road. */}
        <mesh position={[0, 0.056, 0]} castShadow>
          <boxGeometry args={[0.082, 0.013, 0.23]} />
          <meshBasicMaterial color="#f5f2e8" />
        </mesh>
        {[1, -1].map((end) => (
          <mesh
            key={end}
            position={[0, 0.061, end * 0.138]}
            rotation={[end * -0.42, 0, 0]}
            castShadow
          >
            <boxGeometry args={[0.072, 0.012, 0.06]} />
            <meshBasicMaterial color="#f5f2e8" />
          </mesh>
        ))}
        {/* GRIP. A dark strip inset on the top face — the deck reads as one
            solid bone mass from above without it, and from above is most of
            what the turntable shows you. */}
        <mesh position={[0, 0.0635, 0]}>
          <boxGeometry args={[0.062, 0.002, 0.2]} />
          <meshBasicMaterial color="#26241d" />
        </mesh>

        {/* TRUCKS AND WHEELS. The wheels carry the accent: they are the only
            part of the board that is doing anything, and they line up with the
            claimed line running under them. */}
        {[1, -1].map((end) => (
          <group key={end} position={[0, 0, end * 0.078]}>
            <mesh position={[0, 0.041, 0]} castShadow>
              <boxGeometry args={[0.062, 0.014, 0.022]} />
              <meshBasicMaterial color="#26241d" />
            </mesh>
            {[1, -1].map((side) => (
              <mesh
                key={side}
                position={[side * 0.04, 0.024, 0]}
                rotation={[0, 0, Math.PI / 2]}
                castShadow
              >
                {/* Eight-sided, and left un-spun: a faceted wheel that rolled
                    would strobe, and nothing else in the model has a clock in
                    it either. */}
                <cylinderGeometry args={[0.024, 0.024, 0.018, 8]} />
                <meshBasicMaterial color={accent} />
              </mesh>
            ))}
          </group>
        ))}
      </group>

      {/* THE CROWN. */}
      <group ref={crown} position={[0, summitY + 0.16, 0]} visible={false}>
        <mesh castShadow material={toonSkin({ color: accent, rim: 0.3, rimColor: "#fff4d8" })}>
          <torusGeometry args={[0.19, 0.045, 8, 24]} />
          <Outlines thickness={OUTLINE_WIDTH} color={OUTLINE_COLOR} />
        </mesh>
        {Array.from({ length: 5 }, (_, i) => {
          const a = (i / 5) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.cos(a) * 0.19, 0.11, Math.sin(a) * 0.19]}
              castShadow
              material={toonSkin({ color: accent, rim: 0.3, rimColor: "#fff4d8" })}
            >
              <coneGeometry args={[0.05, 0.19, 5]} />
              <Outlines thickness={OUTLINE_WIDTH} color={OUTLINE_COLOR} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

