const plugin = require("tailwindcss/plugin");

const rotateX = plugin(
  function ({ theme, matchUtilities }) {
    matchUtilities(
      {
        "rotate-x": (value) => ({
          transform: `rotateX(${value}deg)`,
        }),
      },
      { values: theme("rotateX") }
    );
  },
  {
    theme: {
      rotateX: {
        "-1": "-1",
        "-2": "-2",
        "-3": "-3",
        "-6": "-6",
        "-12": "-12",
        "-45": "-45",
        "-90": "-90",
        "-180": "-180",
        0: 0,
        1: "1",
        2: "2",
        3: "3",
        6: "6",
        12: "12",
        45: "45",
        90: "90",
        180: "180",
      },
    },
  }
);

module.exports = rotateX;
