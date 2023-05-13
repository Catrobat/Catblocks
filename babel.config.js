const presets = [
  [
    "@babel/preset-env",
    {
      targets: {
        edge: "107",
        firefox: "107",
        chrome: "108",
        safari: "16.1",
        node: "current"
      },
      useBuiltIns: "usage",
      debug: false,
      corejs: 3
    },
  ]
];

module.exports = { presets };