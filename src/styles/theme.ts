import { tokens } from "./tokens";
import type { Theme } from "@emotion/react";

export const theme: Theme = {
  ...tokens,
} as const;

declare module "@emotion/react" {
  export interface Theme {
    colors: typeof tokens.colors;
    elevation: typeof tokens.elevation;
    radius: typeof tokens.radius;
    spacing: typeof tokens.spacing;
    typography: typeof tokens.typography;
  }
}
