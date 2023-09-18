import {config} from "tailwind-config/tailwind.config";

config.darkMode = "class";
config.theme = {
  colors: ({colors}) => ({
    transparent: colors.transparent,
    primary: "#9333EA",
    secondary: "#ff7e33",
    info: "#0C63E7",
    black: colors.black,
    white: colors.white,
    slate: colors.slate,
    gray: {
      50: "#FAFAFC",
      100: "#E9E9EC",
      200: "#C6C8CD",
      300: "#ACAEB6",
      400: "#92959F",
      500: "#777C87",
      600: "#5D6370",
      700: "#434959",
      800: "#293041",
      900: "#0f172a",
    },
    sky: colors.sky,
  }),
  transitionDelay: {
    75: "75ms",
    100: "100ms",
    150: "150ms",
    200: "200ms",
    300: "300ms",
    500: "500ms",
    700: "700ms",
    1000: "1000ms",
  },
  transitionDuration: {
    DEFAULT: "150ms",
    75: "75ms",
    100: "100ms",
    150: "150ms",
    200: "200ms",
    300: "300ms",
    500: "500ms",
    700: "700ms",
    1000: "1000ms",
  },
  transitionProperty: {
    none: "none",
    all: "all",
    DEFAULT:
      "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
    colors:
      "color, background-color, border-color, text-decoration-color, fill, stroke",
    opacity: "opacity",
    shadow: "box-shadow",
    transform: "transform",
  },
  transitionTimingFunction: {
    DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
    linear: "linear",
    in: "cubic-bezier(0.4, 0, 1, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
    "in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
  },
};

export default config;
