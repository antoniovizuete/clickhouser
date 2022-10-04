const { releaseRules } = require("./configs/release.rules");
const preset = "atom";

module.exports = {
  branches: [
    "main",
    {
      name: "staging",
      prerelease: true,
    },
  ],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset,
        releaseRules,
      },
    ],
    ["@semantic-release/release-notes-generator", { preset }],
    ["@semantic-release/changelog", { changelogFile: "CHANGELOG.md" }],
    ["@semantic-release/github"],
    [
      "@semantic-release/git",
      {
        assets: ["CHANGELOG.md", "package.json"],
        message:
          ":bookmark: Release ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
      },
    ],
  ],
};
