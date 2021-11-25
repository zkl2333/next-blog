// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient, typecho_contents } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

type Data = {
	list: typecho_contents[];
};

export const getPostsList = async ({ page = 1, pageSize = 10 }) => {
	try {
		const typecho_contents = await prisma.typecho_contents.findMany({
			where: { type: "post", status: "publish" },
			take: pageSize,
			skip: (page - 1) * pageSize,
			orderBy: {
				created: "desc",
			},
		});
		return typecho_contents;
	} catch (error) {
		console.error(error);
		await prisma.$disconnect();
		return [];
	}
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	console.log(req.query);
	const posts = await getPostsList({
		page: Number(req.query.page || 1),
		pageSize: Number(req.query.pageSize || 10),
	});
	res.status(200).json({ list: posts });
}
