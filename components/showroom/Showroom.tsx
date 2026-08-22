"use client";

import { PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, type ReactNode, type RefObject } from "react";
import * as THREE from "three";
import { toonSkin, TOON_RAMP_FLAT } from "./toon";
import { SpinContext } from "./craft";
import { DocLattice } from "./models/DocLattice";
import { RouteKing } from "./models/RouteKing";
import type { Spin } from "./spin";

export { createSpin, DRAG_SENSITIVITY, SWAP_KICK, type Spin } from "./spin";

/**
 * THE HERO TURNTABLE — one project, on a plinth, that you can turn.
 *
 * Ported in shape (not in code) from dock-rush's `render/Showroom.tsx`: its own
 * canvas, a cel-shaded three-light rig, a plinth with an accent ring, and a
 * turntable with weight. What could not come across is the subject — that
 * garage draws the game's real chassis, and the game's chassis is fused to a
 * running session. These models are self-contained primitives instead.
 *
 * ITS OWN CANVAS, and not a shared one. The showroom is a box in a CSS grid
 * column, and the alternative — telling a page-wide renderer in world units
 * where the browser put its columns — is a layout computed twice, in two
 * languages, that breaks at the first breakpoint.
 *
 * NOTHING MOVES ON ITS OWN. The rest of this site holds to motion only on
 * interaction, and a hero that turns by itself is exactly the idle loop that
 * rule exists to prevent. So the turntable is inert until a pointer touches it,
 * and what it does after that is spend the momentum it was given.
 */

/** Radians per second a hover is worth. Slow enough to read as the object
 *  offering itself rather than as a carousel: a full turn takes half a minute,
 *  so it is never mid-blur while you look at it. */
const HOVER_SPIN = 0.2;
/** How fast a flick dies away. A turntable has weight; it should not stop dead. */
const DRAG_DECAY = 2.4;

function Turntable({ spin, children }: { spin: RefObject<Spin>; children: ReactNode }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    // Clamped because a backgrounded tab hands back one enormous delta on
    // return, and an unclamped flick would resolve it as several whole turns.
    const dt = Math.min(delta, 0.1);
    const s = spin.current;
    if (!s.held) {
      // The flick first, and the hover drift only once it has died: adding them
      // would have a released spin creep on for a second after it looked done.
      s.yaw += s.velocity * dt;
      s.velocity *= Math.exp(-DRAG_DECAY * dt);
      if (s.hovered && Math.abs(s.velocity) < 0.05) s.yaw += HOVER_SPIN * dt;
    }
    if (group.current) group.current.rotation.y = s.yaw;
  });
  return <group ref={group}>{children}</group>;
}

/**
 * The light the site is lit by, at showroom scale: a key over your right
 * shoulder, a cold rim behind, and almost no fill. The near-absent ambient is
 * what keeps cel shading legible — lift the fill and the bands wash together
 * into ordinary shading, which is the one thing a toon ramp is chosen to avoid.
 */
function ShowroomLights() {
  return (
    <>
      <ambientLight intensity={0.16} />
      <hemisphereLight args={["#9fc4ff", "#2b2418", 0.28]} />
      <directionalLight
        position={[5.5, 9.5, 4]}
        intensity={1.9}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
        shadow-camera-near={1}
        shadow-camera-far={30}
        // Small, because there is no heightfield here to self-shadow at grazing
        // angles. `shadowNormalBias` buys acne-freedom by pushing the depth
        // sample along the receiver's normal, and what it spends is contact: on
        // a plinth that normal points straight up, so a generous allowance
        // walks the shadow out from under whatever is standing on it. This only
        // has to clear a texel of a 1024 map over an 8-unit frustum, ~0.008.
        shadow-normalBias={0.01}
      />
      <directionalLight position={[-4.5, 3, -3.5]} intensity={0.42} color="#7fa8d8" />
    </>
  );
}

/**
 * WHAT THE MODEL STANDS ON.
 *
 * A showroom plinth is doing one job — telling you the thing on it is a
 * PRODUCT — and it does that by being the only object in the frame that is
 * perfectly regular. So it is turned, chamfered and banded, and the accent is
 * shown here as a COLOUR rather than as bodywork, which is what makes a project
 * switch land even when the lit side of the new model happens to be facing
 * away.
 *
 * It does not turn with the turntable. A plinth that rotates is a lazy Susan;
 * the deck spins and the base stays put, which is what makes the spin read as
 * mechanism rather than as the whole scene being rotated.
 */
function Plinth({ accent }: { accent: THREE.Color }) {
  return (
    <group>
      {/* Radius 2.6 is set by the frame, not by taste: the widest model is
          about 4.3 across and turns, so it sweeps a circle the disc has to
          clear while still fitting inside the camera's width at the narrowest
          supported aspect. A wider plinth crops at the sides, which reads as
          the model standing on a road. */}
      <mesh position={[0, -0.1, 0]} receiveShadow material={toonSkin({ color: "#16160f", ramp: "flat", rim: 0.14 })}>
        <cylinderGeometry args={[2.6, 2.6, 0.2, 64]} />
      </mesh>
      {/* The chamfer. A truncated cone under the lip, catching one band of the
          key where the vertical wall below it catches none — the plinth's only
          highlight, and the reason the disc has a top edge you can see. */}
      <mesh position={[0, -0.28, 0]} material={toonSkin({ color: "#100f0a", ramp: "flat", rim: 0.1 })}>
        <cylinderGeometry args={[2.6, 2.42, 0.16, 64]} />
      </mesh>
      <mesh position={[0, -0.46, 0]} material={toonSkin({ color: "#0b0b07", ramp: "flat", rim: 0.06 })}>
        <cylinderGeometry args={[2.42, 2.34, 0.2, 64]} />
      </mesh>
      {/* A hair proud of the top face rather than on it: coplanar, the two
          z-fight, and under a turning camera that reads as the plinth
          flickering. */}
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.36, 2.52, 64]} />
        <meshBasicMaterial color={accent} transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
      {/* An inner witness mark, bone and faint. Two rings at different radii
          and different weights is a machined face; one ring is a coaster. */}
      <mesh position={[0, 0.004, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.2, 2.215, 64]} />
        <meshBasicMaterial color="#d8d8cf" transparent opacity={0.12} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export type ModelKey = "route-king" | "doc-pipeline";

const MODELS: Record<ModelKey, (props: { accent: THREE.Color }) => ReactNode> = {
  "route-king": RouteKing,
  "doc-pipeline": DocLattice,
};

/**
 * A swap is a cut, not a dissolve — the outgoing model is already gone by the
 * time this mounts (React keys it on `model`), so all that is left to do is
 * land the new one. It arrives slightly under scale and settles, which reads as
 * a thing being set down rather than as a thing fading up.
 */
function Settle({ children }: { children: ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const t = useRef(0);
  useFrame((_, delta) => {
    if (!group.current || t.current >= 1) return;
    t.current = Math.min(1, t.current + Math.min(delta, 0.1) * 3.2);
    // Ease-out cubic. An overshoot spring here would be the model bouncing,
    // and nothing else on the page bounces.
    const e = 1 - Math.pow(1 - t.current, 3);
    group.current.scale.setScalar(0.9 + 0.1 * e);
  });
  return (
    <group ref={group} scale={0.9}>
      {children}
    </group>
  );
}

export default function Showroom({
  model,
  accent,
  spin,
}: {
  model: ModelKey;
  /** Plain hex, so the caller — a React component holding a project id — never
   *  has to own a three object or think about when to clone it. */
  accent: number;
  spin: RefObject<Spin>;
}) {
  const color = useMemo(() => new THREE.Color(accent), [accent]);
  const Model = MODELS[model];

  return (
    <Canvas
      // "percentage" rather than the bare `shadows` default: that maps to
      // PCFSoftShadowMap, which three deprecated in r185. PCF is the right
      // filter here anyway — a single 1024 map over an 8-unit frustum has
      // plenty of resolution for a box on a disc, and the softer variant's
      // extra taps buy nothing at this scale.
      shadows="percentage"
      dpr={[1, 1.75]}
      // Cel shading wants the raw, flat output: a film curve smears the top two
      // bands of every ramp together. `alpha` so the page background shows
      // through — the canvas is a window, not a panel.
      gl={{ antialias: true, toneMapping: THREE.NoToneMapping, alpha: true }}
    >
      {/* Three-quarter view from above, at a long lens. PERSPECTIVE, where a
          diagram would be orthographic: a little convergence is what makes a
          box on a disc read as an object you could walk round. 24° is narrow
          enough to stay a showroom lens rather than a fisheye. */}
      <PerspectiveCamera
        makeDefault
        fov={24}
        position={[6.8, 3.6, 7.2]}
        onUpdate={(camera) => camera.lookAt(0, 0.7, 0)}
      />
      <ShowroomLights />
      <Plinth accent={color} />
      {/* The models read the pointer too — see `useCrank`. Provided INSIDE the
          canvas because react-three-fiber renders into its own reconciler root,
          and a context from the DOM tree does not cross that boundary. */}
      <SpinContext.Provider value={spin}>
        <Turntable spin={spin}>
          <Settle key={model}>
            <Model accent={color} />
          </Settle>
        </Turntable>
      </SpinContext.Provider>
    </Canvas>
  );
}
