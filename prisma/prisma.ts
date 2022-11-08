import { PrismaClient } from "@prisma/client";

declare global {
  /**
   * Global Prisma Client to avoid instantiating multiple clients in dev mode, as [considered best practice by Prisma](https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices).
   *
   * Note: The client must be instantiated, as it's `undefined` by default.
   */
  // eslint-disable-next-line no-var
  var prismaNext: PrismaClient | undefined;
}

export const prismaNext =
  global.prismaNext ??
  new PrismaClient({
    // log: ["query"],
  });

if (process.env.NODE_ENV !== "production") global.prismaNext = prismaNext;
