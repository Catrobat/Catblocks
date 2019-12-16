const presets = [
  [
    "@babel/env",
    {
      targets: {
        edge: "16",
        firefox: "60",
        chrome: "67",
        safari: "11.1",
        ie: "11"
      },
      useBuiltIns: "usage",
      debug: true,
      corejs: 3
    },
  ]
];

module.exports = { presets };