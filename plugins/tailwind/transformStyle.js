const plugin = require("tailwindcss/plugin");

const transformStyle = plugin(
  function ({ addUtilities, theme, e }) {
    const values = theme("transformStyle");
    var utilities = Object.entries(values).map(([key, value]) => {
      return {
        [`.${e(`transform-style-${key}`)}`]: { transformStyle: `${value}` },
      };
    });
    addUtilities(utilities);
  },
  {
    theme: {
      transformStyle: {
        flat: "flat",
        preserve3d: "preserve-3d",
        inherit: "inherit",
        initial: "initial",
        revert: "revert",
        "revert-layer": "revert-layer",
        unset: "unset",
      },
    },
  }
);

module.exports = transformStyle;
