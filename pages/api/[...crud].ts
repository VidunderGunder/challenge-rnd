import { prismaNext } from "../../prisma/prisma";
import NextCrud, { PrismaAdapter } from "@premieroctet/next-crud";
import { NextApiRequest, NextApiResponse } from "next";
import { cors } from "../../utility/cors";

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await runMiddleware(req, res, cors);
  const nextCrudHandler = await NextCrud({
    swagger: {
      apiUrl: "/api/",
    },
    adapter: new PrismaAdapter({
      prismaClient: prismaNext,
    }),
  });
  return nextCrudHandler(req, res);
};

export default handler;
