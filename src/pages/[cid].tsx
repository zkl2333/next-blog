import { Content } from "@prisma/client";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import React from "react";
import { marked } from "marked";
import hljs from "highlight.js";
import { parseFromString } from "../utils";
import Head from "next/head";
import { getPostsList } from "./api/posts";
import prismaClient from "../prismaClient";

marked.setOptions({
	highlight: function (code, lang) {
		if (!lang) {
			return hljs.highlightAuto(code).value;
		}
		return hljs.highlight(code, { language: lang }).value;
	},
});

export const getStaticProps: GetStaticProps<
	{ post: Content },
	{ cid: string }
> = async ({ params }) => {
	try {
		const contents = await prismaClient.content.findUnique({
			where: {
				cid: Number(params?.cid),
			},
		});

		if (contents) {
			return {
				props: {
					post: contents,
				},
				revalidate: 10000,
			};
		}

		return {
			notFound: true,
		};
	} catch (error) {
		await prismaClient.$disconnect();
		return {
			notFound: true,
		};
	}
};

export const getStaticPaths: GetStaticPaths = async () => {
	const contents = await getPostsList({ page: 0, pageSize: 20 });
	return {
		paths: contents.map((post) => ({
			params: {
				cid: post.cid.toString(),
			},
		})),
		fallback: true,
	};
};

function Post({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
	const router = useRouter();

	if (router.isFallback) {
		return "loading...";
	}

	const postContent = (post.text || "").replace("<!--markdown-->", "");

	return (
		<>
			<Head>
				<title>博客-{parseFromString(post.title || "")}</title>
			</Head>
			<div className="card w-full md:space-y-4 space-y-2 markdown-body">
				<h1>{parseFromString(post.title || "")}</h1>
				<div
					// suppressHydrationWarning={true}
					dangerouslySetInnerHTML={{
						__html: marked(postContent),
					}}
				/>
			</div>
		</>
	);
}

export default Post;
