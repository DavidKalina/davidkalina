"use client";

import { useFrame } from "@react-three/fiber";
import { createContext, useContext, useRef, type RefObject } from "react";
import * as THREE from "three";
import type { Spin } from "./spin";

/**
 * THE WORKSHOP — the parts every model in the showroom is built out of.
 *
 * Two ideas live here. The first is geometry that is CUT rather than assembled:
 * faceting, ribbons that follow a curve, a ground smudge. The second is the
 * crank — the reason these models are alive without ever animating themselves.
 */

/* ------------------------------------------------------------------ *
 * THE CRANK
 * ------------------------------------------------------------------ */

export const SpinContext = createContext<RefObject<Spin> | null>(null);

export interface Crank {
  /** Radians the turntable has been turned through since mount, signed. Turn it
   *  back and the machinery runs back with you. */
  travel: number;
  /** Smoothed radians per second, signed. What a part reads to know how hard it
   *  is being driven right now. */
  rate: number;
}

/**
 * THE TURNTABLE IS THE CRANK.
 *
 * The site's rule is motion only on interaction, which usually means a model
 * that just sits there — and a machine that never runs is a paperweight. So the
 * models are geared to the plinth: turn it and paper feeds, rollers spin, a
 * rider climbs the mountain. Let go and everything coasts to a stop with the
 * turntable, mid-stroke, exactly where the momentum ran out.
 *
 * Nothing here has a clock in it. Every moving part is a pure function of how
 * far the user has turned the thing, which is why it can never idle.
 */
export function useCrank(): RefObject<Crank> {
  const spin = useContext(SpinContext);
  const crank = useRef<Crank>({ travel: 0, rate: 0 });
  const previous = useRef<number | null>(null);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);
    const yaw = spin?.current.yaw ?? 0;
    if (previous.current === null) previous.current = yaw;
    const step = yaw - previous.current;
    previous.current = yaw;
    crank.current.travel += step;
    // Smoothed, because `rate` drives things like lamp brightness and a value
    // taken raw from one frame's delta flickers on any dropped frame.
    const instant = dt > 0 ? step / dt : 0;
    crank.current.rate += (instant - crank.current.rate) * Math.min(1, dt * 8);
  });

  return crank;
}

/* ------------------------------------------------------------------ *
 * GEOMETRY
 * ------------------------------------------------------------------ */

/**
 * Break a geometry's shared vertices so every triangle gets its own normal.
 *
 * three dropped `flatShading` from the toon material, and it was the wrong lever
 * anyway: faceting is a property of the mesh, not of its paint. Done here it
 * survives a material swap, and a lathed cone comes out carved instead of
 * turned — which is the whole difference between a low-poly model and a blob
 * that happens not to have many triangles.
 */
export function facet(geometry: THREE.BufferGeometry): THREE.BufferGeometry {
  const flat = geometry.toNonIndexed();
  flat.computeVertexNormals();
  geometry.dispose();
  return flat;
}

const UP = new THREE.Vector3(0, 1, 0);

/**
 * A ribbon laid along a curve — a road, not a pipe.
 *
 * `TubeGeometry` is the obvious tool and it is wrong for anything that is meant
 * to be a SURFACE: a tube's normal turns through a full circle, so a toon ramp
 * puts bands down its length and the thing reads as cable. A ribbon is two
 * vertices per sample, both offset along the curve's horizontal right, with the
 * normal pinned up. It banks with the climb and stays flat across.
 *
 * Indexed, in walking order, so `setDrawRange` on it reveals the road from the
 * start end — which is how the rider draws his line as he climbs.
 */
export function ribbonGeometry(
  curve: THREE.Curve<THREE.Vector3>,
  segments: number,
  halfWidth: number,
  lift = 0,
): THREE.BufferGeometry {
  const position: number[] = [];
  const normal: number[] = [];
  const uv: number[] = [];
  const index: number[] = [];

  const side = new THREE.Vector3();
  const up = new THREE.Vector3();

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const p = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t).normalize();
    side.crossVectors(tangent, UP);
    // A curve going straight up has no horizontal right. None of ours do, but a
    // NaN here would take the whole geometry out rather than one segment.
    if (side.lengthSq() < 1e-8) side.set(0, 0, 1);
    side.normalize();
    up.crossVectors(side, tangent).normalize();

    p.addScaledVector(up, lift);
    position.push(
      p.x + side.x * halfWidth, p.y + side.y * halfWidth, p.z + side.z * halfWidth,
      p.x - side.x * halfWidth, p.y - side.y * halfWidth, p.z - side.z * halfWidth,
    );
    normal.push(up.x, up.y, up.z, up.x, up.y, up.z);
    uv.push(t, 1, t, 0);

    if (i < segments) {
      const a = i * 2;
      index.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(position, 3));
  geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normal, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  geometry.setIndex(index);
  return geometry;
}

/**
 * The alpha map that turns a thin ribbon into a dashed centre line. One row of
 * texels, nearest-filtered and tiled along the road's u — so the dash count is
 * a `repeat` value rather than a hundred little quads in the scene graph.
 */
export const DASH_ALPHA = (() => {
  // RGBA, and not the single red channel a mask like this obviously wants,
  // because three's `alphaMap` reads the GREEN channel. A red-format texture
  // here samples as (r, 0, 0) and multiplies the whole ribbon out of existence.
  const on = [255, 255, 255, 255];
  const off = [0, 0, 0, 0];
  const data = new Uint8Array([...on, ...on, ...off, ...off, ...off]);
  const texture = new THREE.DataTexture(data, 5, 1, THREE.RGBAFormat);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.wrapS = THREE.RepeatWrapping;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;
  return texture;
})();

/**
 * The dark under a thing that is standing on something.
 *
 * A shadow map gives you the cast shadow — the long one thrown across the
 * plinth by the key light — and it is the wrong shadow for grounding. What
 * grounds an object is the tight, dark, ambient-occluded patch directly beneath
 * it, and no single directional light will ever produce that. So it is painted:
 * a radial falloff on a plane, sat on the plinth face.
 *
 * Built as raw texel data rather than on a 2D canvas so it costs nothing at
 * import time and never touches the DOM.
 */
/** Where the smudge stops being solid, as a fraction of its radius. */
const SMUDGE_PLATEAU = 0.62;

const SMUDGE = (() => {
  const size = 64;
  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = (x + 0.5) / size - 0.5;
      const dy = (y + 0.5) / size - 0.5;
      const r = Math.min(1, Math.hypot(dx, dy) * 2);
      const i = (y * size + x) * 4;
      // Solid to the plateau, then a fade. A falloff that starts at the centre
      // is the wrong shape for this: the whole plateau ends up hidden under the
      // object, and all that is left showing round the edge is the last two
      // percent of the ramp — which is to say, nothing. The caller sizes the
      // smudge so the plateau matches the footprint and the fade does the work.
      const fade = Math.min(1, Math.max(0, (r - SMUDGE_PLATEAU) / (1 - SMUDGE_PLATEAU)));
      data[i + 3] = Math.round(255 * Math.pow(1 - fade, 1.6));
    }
  }
  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  texture.needsUpdate = true;
  return texture;
})();

/**
 * @param radius Half the smudge's extent. Size it so `radius * 0.62` — the
 *   plateau — covers the object's footprint, and the fade lands outside it.
 */
export function ContactSmudge({
  radius,
  opacity = 0.55,
  position = [0, 0, 0],
  scale = [1, 1],
}: {
  radius: number;
  opacity?: number;
  position?: [number, number, number];
  /** Stretch, for masses that are not round. */
  scale?: [number, number];
}) {
  return (
    <mesh
      position={[position[0], position[1] + 0.008, position[2]]}
      rotation={[-Math.PI / 2, 0, 0]}
      scale={[scale[0], scale[1], 1]}
      renderOrder={-1}
    >
      <planeGeometry args={[radius * 2, radius * 2]} />
      <meshBasicMaterial
        map={SMUDGE}
        color="#000000"
        transparent
        opacity={opacity}
        // Off, or the smudge's own quad occludes the cast shadow and the ring
        // drawn on the plinth beneath it.
        depthWrite={false}
      />
    </mesh>
  );
}

/* ------------------------------------------------------------------ *
 * PLACEMENT
 * ------------------------------------------------------------------ */

/**
 * A seeded, ugly little hash. Scenery placed by hand at this count would be a
 * hundred lines of coordinates; placed by `Math.random` it would be different on
 * every mount, which is a model that has no fixed identity. This is neither: the
 * same mountain, every time, with none of the regularity that gives away a
 * `for` loop.
 */
export function rand(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

/** `rand`, remapped to a range. */
export function randRange(seed: number, min: number, max: number): number {
  return min + rand(seed) * (max - min);
}
