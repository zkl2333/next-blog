// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Content } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "../../prismaClient";

type Data = {
	list: (Content & {
		author: {
			name: string | null;
			mail: string | null;
		} | null;
	})[];
};

export const getPostsList = async ({ page = 0, pageSize = 10 }) => {
	try {
		const contents = await prismaClient.content.findMany({
			where: { type: "post", status: "publish" },
			take: pageSize,
			skip: page * pageSize,
			include: {
				relationships: {
					select: {
						metas: true,
					},
				},
				author: {
					select: {
						name: true,
						mail: true,
					},
				},
			},
			orderBy: {
				created: "desc",
			},
		});
		return contents;
	} catch (error) {
		console.error(error);
		return [];
	}
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const posts = await getPostsList({
		page: Number(req.query.page || 1),
		pageSize: Number(req.query.pageSize || 10),
	});
	res.status(200).json({ list: posts });
}
