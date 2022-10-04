const COMMIT_REF = process.env.VERCEL_GIT_COMMIT_REF;
const COMMIT_MSG = process.env.VERCEL_GIT_COMMIT_MESSAGE;

console.log("VERCEL_GIT_COMMIT_REF", COMMIT_REF);
console.log("VERCEL_GIT_COMMIT_MESSAGE", COMMIT_MSG);

if (
  ["staging", "main"].includes(COMMIT_REF) &&
  !COMMIT_MSG.includes("[skip ci]")
) {
  console.log("✅ - Build can proceed");
  process.exit(1);
} else {
  console.log("❌ - Build skipped");
  process.exit(0);
}
