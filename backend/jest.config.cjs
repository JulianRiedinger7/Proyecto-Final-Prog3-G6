/** @type {import('jest').Config} */
module.exports = {
  clearMocks: true,
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": ["ts-jest", { tsconfig: "tsconfig.json", diagnostics: false }],
  },
};
