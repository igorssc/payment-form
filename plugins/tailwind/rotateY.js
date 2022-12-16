const plugin = require("tailwindcss/plugin");

const rotateY = plugin(
  function ({ theme, matchUtilities }) {
    matchUtilities(
      {
        "rotate-y": (value) => ({
          transform: `rotateY(${value}deg)`,
        }),
      },
      { values: theme("rotateY") }
    );
  },
  {
    theme: {
      rotateY: {
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

module.exports = rotateY;
