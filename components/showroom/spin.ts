/**
 * WHAT THE POINTER DOES TO THE TURNTABLE.
 *
 * Its own module, and not part of `Showroom`, for two reasons. The DOM half of
 * the hero owns this state and must not pull three.js in to read it; and the
 * models need it too, so leaving it in `Showroom` — which imports the models —
 * would be an import cycle.
 */

export interface Spin {
  yaw: number;
  /** Radians per second still owed from the last flick or swap. */
  velocity: number;
  /** True while a finger or a button is down: nothing else may drive the yaw. */
  held: boolean;
  /** True while the pointer is over the box but not pressing. */
  hovered: boolean;
}

export function createSpin(): Spin {
  // A few degrees off square to start. Head-on, every one of these models is a
  // silhouette; the quarter view is what makes them objects.
  return { yaw: -0.35, velocity: 0, held: false, hovered: false };
}

/** Radians of yaw per pixel dragged. Tuned so a drag across the full 5-column
 *  width is a little over half a turn — enough to get round the back without
 *  becoming a spinner. */
export const DRAG_SENSITIVITY = 0.011;

/** The kick a project swap gives the turntable, in radians per second. The user
 *  pressed a button; the object should acknowledge it and settle. */
export const SWAP_KICK = 2.6;
