import { PrismaClient, typecho_contents } from ".prisma/client";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { marked } from "marked";
import prism from "prismjs";
import { parseFromString } from "../utils";

marked.setOptions({
	highlight: function (code, lang) {
		if (!prism.languages[lang]) {
			const fallback = "markup";
			console.error(
				`Language '${lang}' is not available in Prism.js, will use '${fallback}' instead.`
			);
			lang = fallback;
		}
		return prism.highlight(code, prism.languages[lang], lang);
	},
});

const prisma = new PrismaClient();

function Post({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
	const router = useRouter();

	const [isMounted, setMount] = useState(false);
	useEffect(() => {
		setMount(true);
	}, []);

	if (router.isFallback) {
		return <div>Loading...</div>;
	}
	return (
		<div className="card markdown-body ">
			<h1>{parseFromString(post.title || "")}</h1>
			{isMounted && (
				<div
					dangerouslySetInnerHTML={{
						__html: marked(post.text || ""),
					}}
				/>
			)}
		</div>
	);
}

export const getStaticProps: GetStaticProps<
	{ post: typecho_contents },
	{ postId: string }
> = async ({ params }) => {
	try {
		const typecho_contents = await prisma.typecho_contents.findUnique({
			where: {
				cid: Number(params?.postId),
			},
		});

		if (typecho_contents) {
			return {
				props: {
					post: typecho_contents,
				},
				revalidate: 10000,
			};
		}

		return {
			notFound: true,
		};
	} catch (error) {
		await prisma.$disconnect();
		return {
			notFound: true,
		};
	}
};

export const getStaticPaths: GetStaticPaths = async () => {
	const typecho_contents = await prisma.typecho_contents.findMany({
		where: { type: "post" },
	});
	return {
		paths: typecho_contents.map((post) => {
			return {
				params: {
					postId: post.cid.toString(),
				},
			};
		}),
		fallback: true,
	};
};

export default Post;
