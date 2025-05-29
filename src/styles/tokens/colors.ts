export const colors = {
  primary: {
    300: "#5eead4",
    400: "#2dd4bf",
    500: "#10b77f",
    600: "#059669",
    700: "#0d9488",
    800: "#047857",
    900: "#0f766e",
  },

  text: {
    primary: "#ffffff",
    secondary: "#a1a1aa",
    muted: "#71717a",
    inverse: "#09090b",
  },

  background: {
    primary: "#09090b",
    secondary: "#18181b",
    tertiary: "#27272a",
    surface: "#3f3f46",
  },

  border: {
    default: "#27272a",
    hover: "#3f3f46",
    focus: "#10b77f",
    error: "#dc2626",
  },

  success: "#22d3ee",
  warning: "#fbbf24",
  error: "#f87171",
  info: "#60a5fa",

  gradient: {
    primary: {
      from: "#059669",
      to: "#0d9488",
    },
    primaryHover: {
      from: "#047857",
      to: "#0f766e",
    },
  },
} as const;
