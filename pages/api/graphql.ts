import "reflect-metadata";
import { resolvers } from "./../../prisma/generated/type-graphql/index";
import { buildSchemaSync } from "type-graphql";
import { ApolloServer } from "apollo-server-micro";
import { PageConfig } from "next";
import { microCors } from "../../utility/cors";
import { prismaNext } from "../../prisma/prisma";

const server = new ApolloServer({
  schema: buildSchemaSync({
    resolvers,
  }),
  context(ctx) {
    return { ...ctx, prisma: prismaNext };
  },
});

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

const serverStart = server.start();

export default microCors(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await serverStart;
  await server.createHandler({ path: "/api/graphql" })(req, res);
});
