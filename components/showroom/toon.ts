import * as THREE from "three";

/**
 * Cel shading for the hero showroom, ported from dock-rush's `render/toon.ts`.
 *
 * A toon material swaps the smooth falloff of a lit surface for a lookup into a
 * gradient texture, so how the models read is decided entirely by what is in
 * that texture. Nearest filtering is what makes it band rather than blend — the
 * whole effect is one filter mode away from being ordinary shading.
 *
 * The ramps are built once at module load and shared by every material here.
 * Nothing mutates them and a gradient map is a couple of hundred bytes, so
 * there is no reason for each mesh to carry its own.
 */

/**
 * Build a gradient map from explicit luminance stops (0..1, dark to light).
 *
 * Stops are given rather than computed from a band count because evenly-spaced
 * bands are what makes cel shading look cheap: real toon ramps spend most of
 * their range in the midtones and keep the shadow terminator tight, so a
 * surface turning away from the key reads as one decisive step into shadow
 * instead of a slow staircase.
 */
function ramp(stops: number[]): THREE.DataTexture {
  const data = new Uint8Array(stops.map((s) => Math.round(THREE.MathUtils.clamp(s, 0, 1) * 255)));
  const texture = new THREE.DataTexture(data, stops.length, 1, THREE.RedFormat);
  // The point of the whole exercise. Linear filtering here gives back exactly
  // the smooth gradient the toon material was chosen to avoid.
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Four bands, for bodywork — the curved, detailed surfaces that carry a model.
 * The floor at 0.3 rather than 0 keeps the shadow side legible against a page
 * background that is itself nearly black (--bg is #0c0c08); a true-black
 * terminator here would read as a hole rather than as a turned-away face.
 */
export const TOON_RAMP_BODY = ramp([0.3, 0.55, 0.78, 1.0]);

/**
 * Three bands, for large flat surfaces — the plinth, slabs, sheets. Big planes
 * want few bands: every boundary on a large surface is a hard line across a lot
 * of screen, and at five bands a slab reads as a contour map rather than a slab.
 */
export const TOON_RAMP_FLAT = ramp([0.32, 0.66, 1.0]);

/** The ink colour for drei `<Outlines>`. Near-black, but warm, like --bg. */
export const OUTLINE_COLOR = "#07070a";
/** Outline thickness in screen pixels. One pixel reads as a drawn line; more
 *  reads as a sticker. */
export const OUTLINE_WIDTH = 1.6;

/**
 * A RIM. The one thing separating a cel-shaded model that looks moulded from
 * one that looks printed.
 *
 * Toon shading only knows about the angle to the light, so every surface facing
 * away from the key resolves to the same floor band and the model loses its
 * edges against a near-black page. A rim term is angle to the CAMERA instead:
 * it lights the silhouette, all the way round, whichever way the turntable has
 * put the object. Physically it is a cheat. It is also what every showroom
 * photograph does with a strip light behind the subject.
 *
 * Stepped, not smoothed, because a soft fresnel on a banded surface reads as
 * the toon ramp having failed rather than as a light.
 */
function patchRim(material: THREE.MeshToonMaterial, color: THREE.Color, strength: number, start: number) {
  const rgb = `vec3(${color.r.toFixed(4)}, ${color.g.toFixed(4)}, ${color.b.toFixed(4)})`;
  material.onBeforeCompile = (shader) => {
    shader.fragmentShader = shader.fragmentShader.replace(
      "vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;",
      `vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
       float rimFresnel = 1.0 - saturate( dot( normalize( vViewPosition ), normal ) );
       outgoingLight += ${rgb} * ${strength.toFixed(4)} * step( ${start.toFixed(4)}, rimFresnel );`,
    );
  };
}

export interface SkinOptions {
  color: THREE.ColorRepresentation;
  /** Which ramp. `flat` for slabs and large planes, `body` for everything that
   *  is meant to read as a formed part. */
  ramp?: "body" | "flat";
  /** Rim strength in linear light. 0 disables the whole term — and with it the
   *  shader patch, so a rimless skin compiles to stock three. */
  rim?: number;
  rimColor?: THREE.ColorRepresentation;
  /** Where the rim band starts, as a fresnel value. Higher is a thinner line. */
  rimStart?: number;
}

/**
 * Materials are shared across every mesh that asks for the same skin, and built
 * once. There are maybe a dozen distinct skins in the whole showroom and none
 * of them are ever mutated, so the alternative — a material per mesh, rebuilt
 * whenever React re-renders a model — is a pile of shader recompiles bought for
 * nothing.
 */
const SKINS = new Map<string, THREE.MeshToonMaterial>();

export function toonSkin(options: SkinOptions): THREE.MeshToonMaterial {
  const {
    color,
    ramp = "body",
    rim = 0.16,
    rimColor = "#9fc4ff",
    rimStart = 0.62,
  } = options;

  const base = new THREE.Color(color);
  const key = [base.getHexString(), ramp, rim, new THREE.Color(rimColor).getHexString(), rimStart].join("|");
  const cached = SKINS.get(key);
  if (cached) return cached;

  const material = new THREE.MeshToonMaterial({
    color: base,
    gradientMap: ramp === "flat" ? TOON_RAMP_FLAT : TOON_RAMP_BODY,
  });
  if (rim > 0) {
    patchRim(material, new THREE.Color(rimColor), rim, rimStart);
    // Without this, two skins differing only in their patched rim share a
    // compiled program — three keys the cache on the material's own properties
    // and knows nothing about what `onBeforeCompile` did to the source.
    material.customProgramCacheKey = () => key;
  }
  SKINS.set(key, material);
  return material;
}
