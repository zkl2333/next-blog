import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

prismaClient.$on("beforeExit", async () => {
	console.log("prismaClient Exit");
});

export default prismaClient;
