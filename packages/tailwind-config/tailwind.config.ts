import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#27104E",
        purple: "#9854CB",
        "light-purple": "rgba(221, 172, 245, 0.4)",
      },
    },
  },
  prefix: "tw-",
  plugins: [],
};

export type { Config };
export { config };
