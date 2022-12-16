const rotateX = require("./plugins/tailwind/rotateX");
const rotateY = require("./plugins/tailwind/rotateY");
const backfaceVisibility = require("./plugins/tailwind/backfaceVisibility");
const transformStyle = require("./plugins/tailwind/transformStyle");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [rotateX, rotateY, backfaceVisibility, transformStyle],
};
