import type { AppProps } from "next/app";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import Head from "next/head";
import "../styles/post.scss";
import "../styles/globals.css";
import useSWR from "swr";
import { fetcher } from "../utils";
import { DarkContext, OptionsContext } from "../context";

function MyApp({ Component, pageProps }: AppProps) {
	const [sysDark, setSysDark] = useState(false);
	const [userDarkSetting, setUserDarkSetting] = useState<
		"dark" | "light" | "auto"
	>("auto");

	const { data: optionsMap } = useSWR("/api/options", fetcher, {
		dedupingInterval: 20000,
	});

	useEffect(() => {
		const darkModeMatchMedia =
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)");

		const darkHandler = (e: MediaQueryListEvent) => {
			setSysDark(e.matches);
		};
		// 判断是否匹配深色模式
		if (darkModeMatchMedia && darkModeMatchMedia.matches) {
			setSysDark(true);
		}
		if (darkModeMatchMedia) {
			// 监听主题切换事件
			darkModeMatchMedia.addEventListener("change", darkHandler);
			return () => {
				darkModeMatchMedia.removeEventListener("change", darkHandler);
			};
		}
	}, []);

	const isDarkmod =
		userDarkSetting === "auto" ? sysDark : userDarkSetting === "dark";

	useEffect(() => {
		document.documentElement.classList.toggle("dark", isDarkmod);
	}, [isDarkmod, userDarkSetting]);

	useEffect(() => {
		console.log(optionsMap);
	}, [optionsMap]);

	return (
		<OptionsContext.Provider value={optionsMap}>
			<DarkContext.Provider
				value={{ userDarkSetting, setUserDarkSetting }}>
				<Layout>
					<Head>
						<title>博客</title>
						<meta
							name="viewport"
							content="width=device-width, viewport-fit=cover"
						/>
						<link rel="icon" href="/favicon.ico" />
					</Head>
					<Component {...pageProps} />
				</Layout>
			</DarkContext.Provider>
		</OptionsContext.Provider>
	);
}

export default MyApp;
