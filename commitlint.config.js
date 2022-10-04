const { releaseRules } = require("./config/release.rules");

module.exports = {
  rules: {
    "body-leading-blank": [2, "always"],
    "footer-leading-blank": [2, "always"],
    "header-max-length": [2, "always", 72],
    "scope-case": [2, "always", "lowerCase"],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "type-case": [2, "always", "lowerCase"],
    "type-empty": [2, "never"],
    "type-enum": [
      2,
      "always",
      [
        ...releaseRules.map(({ emoji }) => emoji),
        ":white_check_mark:",
        ":memo:",
        ":bookmark:",
        ":wip:",
      ],
    ],
  },
  parserPreset: {
    parserOpts: {
      headerPattern: /^(:.*?:) (.*)$/,
      headerCorrespondence: ["type", "subject"],
    },
  },
};
