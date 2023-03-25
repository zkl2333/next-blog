import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import React from "react";
import { marked } from "marked";
import hljs from "highlight.js";
import { parseFromString } from "../utils";
import Head from "next/head";
import { getPostData, getPostsList } from "./api/posts";

marked.setOptions({
	highlight: function (code, lang) {
		if (!lang) {
			return hljs.highlightAuto(code).value;
		}
		return hljs.highlight(code, { language: lang }).value;
	},
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
	if (params && Array.isArray(params.permalink)) {
		const permalink = params.permalink.join("/");
		const post = await getPostData(permalink);
		if (post) {
			return {
				props: {
					post,
				},
			};
		}
	}
	return { notFound: true };
};

export const getStaticPaths: GetStaticPaths = async () => {
	const contents = await getPostsList({ page: 0, pageSize: 20 });
	const paths = contents
		.map(({ permalink }) => {
			const parts = permalink
				.split("/")
				.filter((p: string) => p.length > 0);
			return {
				params: { permalink: parts },
			};
		})
		.filter((path) => path.params.permalink.length > 0);
	return {
		paths,
		fallback: false,
	};
};

function Post({
	post,
	optionsMap,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const router = useRouter();

	if (router.isFallback) {
		return "loading...";
	}

	const postContent = post.content;

	return (
		<>
			<Head>
				<title>
					{optionsMap?.title}-{parseFromString(post.title || "")}
				</title>
			</Head>
			<div className="card w-full md:space-y-4 space-y-2 markdown-body">
				<h1>{parseFromString(post.title || "")}</h1>
				<div
					// suppressHydrationWarning={true}
					dangerouslySetInnerHTML={{
						__html: marked(postContent || ""),
					}}
				/>
			</div>
		</>
	);
}

export default Post;
