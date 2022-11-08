import { fileOrFolderExists, runCommand } from "../../functions/file";

const requiredFileOrFolderPaths = [
  "prisma/dev.db",
  "prisma/migrations",
  "prisma/generated/type-graphql/index.ts",
];

(async () => {
  for (const path of requiredFileOrFolderPaths) {
    if (!(await fileOrFolderExists(path))) {
      console.log("Backend not found, so we'll create one for you...");
      runCommand("yarn migrate");
      break;
    }
  }
})();
