const presets = [
  [
    "@babel/env",
    {
      targets: {
        edge: "18",
        firefox: "67",
        chrome: "73",
        safari: "13",
        node: "current"
      },
      useBuiltIns: "usage",
      debug: true,
      corejs: 3
    },
  ]
];

module.exports = { presets };