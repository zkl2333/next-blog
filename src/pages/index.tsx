import { Content } from "@prisma/client";
import dayjs from "dayjs";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";
import "dayjs/locale/zh-cn";
import Calendar from "dayjs/plugin/calendar";
import { getPostsList } from "./api/posts";
import useSWRInfinite from "swr/infinite";
import { fetcher, parseFromString } from "../utils";
import React from "react";
import Button from "../components/Button/Button";
import { getOptions } from "./api/options";
import Head from "next/head";

dayjs.locale("zh-cn");
dayjs.extend(Calendar);

const PAGE_SIZE = 10;

type contentWithAuthor = Content & {
	author: {
		name: string | null;
		mail: string | null;
	} | null;
};

export const getStaticProps: GetStaticProps<
	{ posts: contentWithAuthor[]; optionsMap: { [key: string]: string | null} },
	{}
> = async () => {
	const posts = await getPostsList({});
	const optionsMap = await getOptions();
	return {
		props: {
			posts,
			optionsMap,
		},
		revalidate: 10000,
	};
};

const getKey = (
	pageIndex: any,
	previousPageData: {
		list: contentWithAuthor[];
	} | null
) => {
	if (previousPageData?.list && !previousPageData.list.length) return null; // reached the end
	return `/api/posts?page=${pageIndex}&pageSize=${PAGE_SIZE}`; // SWR key
};

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (
	props
) => {
	const { data, size, setSize, isValidating } = useSWRInfinite(
		getKey,
		fetcher,
		{
			initialSize: 2,
			fallbackData: [{ list: props.posts }],
		}
	);
	if (!data) return <>loading</>;
	const loadMore = async () => {
		setSize(size + 1);
	};
	const posts = data
		? ([] as contentWithAuthor[]).concat(...data.map((page) => page.list))
		: [];
	const isEmpty = posts.length === 0;
	const isReachingEnd =
		isEmpty || (data && data[data.length - 1]?.list.length < PAGE_SIZE);

	return (
		<main className={"w-full md:space-y-4 space-y-2"}>
			<Head>
				<title>{props.optionsMap.title}</title>
			</Head>
			{posts.map((post) => {
				return (
					<div key={post.cid} className="min-w-full mx-auto card">
						<div className="flex items-center justify-between">
							<span className="text-sm font-light text-gray-600 dark:text-gray-400">
								{post.modified &&
									dayjs.unix(post.modified).calendar(null, {
										sameDay: "[今天] h:mm A", // The same day ( Today at 2:30 AM )
										nextDay: "[明天]", // The next day ( Tomorrow at 2:30 AM )
										nextWeek: "dddd", // The next week ( Sunday at 2:30 AM )
										lastDay: "[昨天]", // The day before ( Yesterday at 2:30 AM )
										lastWeek: "[上周] dddd", // Last week ( Last Monday at 2:30 AM )
										sameElse: "YYYY/DD/MM", // Everything else ( 7/10/2011 )
									})}
							</span>
							<a className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500">
								Code
							</a>
						</div>

						<div className="mt-2 ">
							<Link href={`/${post.cid}`} passHref>
								<Button
									type="text"
									className="block truncate text-2xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline">
									{parseFromString(post.title || "")}
								</Button>
							</Link>
							<p className="mt-2 text-gray-600 dark:text-gray-300">
								{post.slug}
							</p>
						</div>

						<div className="flex items-center justify-between mt-4">
							<Link href={`/${post.cid}`} passHref>
								<Button type="link">Read more</Button>
							</Link>

							<div className="flex items-center">
								<a className="font-bold text-gray-700 cursor-pointer dark:text-gray-200">
									{post?.author?.name}
								</a>
							</div>
						</div>
					</div>
				);
			})}

			<Button
				disabled={isReachingEnd || isValidating}
				onClick={!(isReachingEnd || isValidating) ? loadMore : () => {}}
				className="w-max mx-auto">
				加载更多
			</Button>
		</main>
	);
};

export default Home;
