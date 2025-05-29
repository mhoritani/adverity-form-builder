import { colors } from "./colors";
import { spacing } from "./spacing";
import { typography } from "./typography";
import { radius } from "./radius";
import { elevation } from "./elevation";

export const tokens = {
  colors: colors,
  spacing,
  typography,
  radius,
  elevation,
} as const;

export type Tokens = typeof tokens;
