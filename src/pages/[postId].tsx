import { PrismaClient, typecho_contents } from ".prisma/client";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { marked } from "marked";
import prism from "prismjs";
import { parseFromString } from "../utils";
import Head from "next/head";

marked.setOptions({
	highlight: function (code, lang) {
		if (!prism.languages[lang]) {
			const fallback = "markup";
			if (lang === "") return fallback;
			try {
				require("prismjs/components/prism-" + lang);
				console.log("Prism.js 动态加载语言", lang);
			} catch (error) {
				console.warn(
					`语言 '${lang}' 在 Prism.js 中不可用 , 使用 '${fallback}' 渲染代码高亮.`
				);
				lang = fallback;
			}
		}
		return prism.highlight(code, prism.languages[lang], lang);
	},
});

const prisma = new PrismaClient();

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

function Post({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
	const router = useRouter();

	const [isMounted, setMount] = useState(false);
	useEffect(() => {
		setMount(true);
	}, []);

	return (
		<>
			<Head>
				<title>博客-{parseFromString(post.title || "")}</title>
			</Head>
			<div className="card w-full md:space-y-4 space-y-2 markdown-body">
				{router.isFallback ? (
					"loading..."
				) : (
					<>
						<h1>{parseFromString(post.title || "")}</h1>
						{isMounted && (
							<div
								dangerouslySetInnerHTML={{
									__html: marked(post.text || ""),
								}}
							/>
						)}
					</>
				)}
			</div>
		</>
	);
}

export default Post;
