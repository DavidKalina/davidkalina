import { PROJECT_GRID_CONSTANTS } from "@/constants/projectGrid";
import type { ModelKey } from "@/components/showroom/Showroom";

/**
 * The hero turntable's deck — which project is shown, and as what.
 *
 * `model` is a key rather than a component so this file stays data: importing
 * the models here would pull three.js into every module that wants to know a
 * project's name, including the server ones.
 *
 * The accents keep the tones the trading-card deck used before it: the flagship
 * carries the site's signal gold, the other carries bone. Two golds would make
 * a project switch read as a re-render rather than as a different thing.
 */
export type ShowroomEntry = {
  project: (typeof PROJECT_GRID_CONSTANTS.projects)[number];
  model: ModelKey;
  /** Plain hex — see the `accent` prop on `Showroom`. */
  accent: number;
  category: string;
  /** Short enough to sit on one line under the plinth at the 5-column width. */
  caption: string;
};

export const SHOWROOM_DECK: ReadonlyArray<ShowroomEntry> = [
  {
    project: PROJECT_GRID_CONSTANTS.projects[1],
    model: "route-king",
    accent: 0xe5a93a,
    category: "MOBILE · REALTIME",
    caption: "Ride together, even when you ride alone.",
  },
  {
    project: PROJECT_GRID_CONSTANTS.projects[0],
    model: "doc-pipeline",
    accent: 0xd8d8cf,
    category: "PIPELINE",
    caption: "Event-driven extraction at 1/50× the token cost.",
  },
];
