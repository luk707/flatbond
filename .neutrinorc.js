module.exports = {
  use: [
    [
      "@neutrinojs/vue",
      {
        html: {
          title: "flatfair"
        }
      }
    ],
    [
      "@neutrinojs/jest",
      { testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$" }
    ]
  ]
};
