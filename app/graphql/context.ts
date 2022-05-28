import { PrismaClient } from "@prisma/client";
import { prisma } from "../lib/prisma";

export type Context = {
  prisma: PrismaClient;
};

/**
 * resolverがPrismaClientにアクセスし、データベースにクエリを送信できるようにする
 * @returns prismaClient
 */
export async function createContext(): Promise<Context> {
  return {
    prisma,
  };
}
