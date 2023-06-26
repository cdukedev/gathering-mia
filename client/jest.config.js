module.exports = {
  // preset: "ts-jest",
  setupFilesAfterEnv: ["./src/setupTests.js"],
  moduleNameMapper: {
    "\\.(css|less|scss|svg)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
  },
  testEnvironment: "jsdom",
  // transform: {
  //   "^.+\\.(ts|tsx)$": "ts-jest",
  //   "^.+\\.(js|jsx)$": "babel-jest",
  // },
};
