import React from "react";
import { PrismaClient } from "@prisma/client";
import { InferGetStaticPropsType } from "next";

const prisma = new PrismaClient();

export default function Install({
	typecho_options,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	return <pre>{JSON.stringify(typecho_options, null, 2)}</pre>;
}

export const getStaticProps = async () => {
	try {
		const typecho_options = await prisma.typecho_options.findMany();
		return {
			props: {
				typecho_options,
			},
		};
	} catch (error) {
		await prisma.$disconnect();
		return {
			props: { typecho_options: [] },
		};
	}
};
