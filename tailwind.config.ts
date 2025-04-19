import type { Config } from "tailwindcss";
import scrollbarHide from "tailwind-scrollbar-hide"; // ✅ استخدم import

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/globals.css",
  ],
  theme: {
    extend: {
      fontFamily: {
        cairo: ["var(--font-cairo)", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
        aboreto: ["var(--font-aboreto)", "cursive"],
        inknut: ["var(--font-inknut-antiqua)", "serif"],
        ravi: ["var(--font-ravi-prakash)", "sans-serif"],
        brick: ["var(--font-brick3d)", "sans-serif"],
      },
      colors: {
        textWhite: "#ffffff",
        golden: "#d7b259",
        midnightBlue: "var(--color-midnight)",
        deepMahogany: "var(--color-mahogany)",
        colorButtonTransparent: "var(--color-white-transparent)",
        deepPurple: "var(--color-deep-purple)",
        bgBlueColor: "#020032",
        twhite: "var(--white)",
        lightGray: "var(--light-gray)",
        darkBlue: "var(--dark-blue)",
      },
    },
  },
  plugins: [scrollbarHide], // ✅ استخدم المتغير المستورد
};

export default config;
