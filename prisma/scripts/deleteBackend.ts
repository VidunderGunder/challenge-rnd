import { deleteAll } from "../../functions/file";

export async function deleteBackend() {
  ["prisma/generated", "prisma/migrations", "prisma/dev.db"].forEach(
    async (path) => {
      await deleteAll(path);
    }
  );
}

deleteBackend();
