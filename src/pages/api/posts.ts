// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const typechoExportPath = "typechoExport/post";

const getStaticContents = (page: number, pageSize: number) => {
	const staticContentPath = path.join(process.cwd(), typechoExportPath);
	const files = fs.readdirSync(staticContentPath);
	const posts = files
		.filter((filename) => filename.endsWith(".md"))
		.map((filename) => {
			const filePath = path.join(staticContentPath, filename);
			const fileContent = fs.readFileSync(filePath, "utf-8");
			const { data, content } = matter(fileContent);
			const permalink = data.permalink
				? data.permalink
				: `archives/${data.slug}.html`;
			return {
				...(data as Post),
				permalink,
				author: {
					name: "zkl2333",
					mail: "i@zkl2333.com",
				},
				content,
			};
		});
	return posts
		.sort((a, b) => {
			return new Date(b.date).getTime() - new Date(a.date).getTime();
		})
		.slice(page * pageSize, (page + 1) * pageSize);
};

export async function getPostData(permalink: string) {
	const staticContentPath = path.join(process.cwd(), typechoExportPath);
	const files = fs.readdirSync(staticContentPath);
	let data: any = {};
	let fileContents = "";

	for (const fileName of files) {
		const fullPath = path.join(staticContentPath, fileName);
		const currentFileContents = fs.readFileSync(fullPath, "utf8");

		const { data: currentData, content } = matter(currentFileContents);

		const postPermalink = currentData.permalink
			? currentData.permalink
			: `archives/${currentData.slug}.html`;

		if (postPermalink === "/" + permalink) {
			fileContents = content;
			data = currentData;
			break;
		}
	}

	if (!fileContents) {
		return null;
	}

	return {
		...(data as Post),
		permalink,
		author: {
			name: "zkl2333",
			mail: "i@zkl2333.com",
		},
		content: fileContents,
	};
}

type Data = {
	list: any[];
};

export const getPostsList = async ({ page = 0, pageSize = 10 }) => {
	try {
		const posts = getStaticContents(page, pageSize);
		return posts;
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
