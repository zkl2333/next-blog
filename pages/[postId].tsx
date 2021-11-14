import { PrismaClient, typecho_contents } from ".prisma/client";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import React from "react";

const prisma = new PrismaClient();

function Post({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
	const router = useRouter();
	if (router.isFallback) {
		return <div>Loading...</div>;
	}
	return <pre>{post.text}</pre>;
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
