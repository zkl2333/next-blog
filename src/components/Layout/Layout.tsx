import Link from "next/link";
import React, { useContext } from "react";
import { DarkContext } from "../../pages/_app";
import Image from "next/image";
import { MD5 } from "../../utils";

const darkModeText: { [k in UserDarkSetting]: string } = {
	dark: "夜间模式",
	light: "日间模式",
	auto: "跟随系统",
};

const Layout: React.FC = ({ children }) => {
	const context = useContext(DarkContext);

	const menuList = [
		{
			name: "首页",
			href: "/",
		},
		{
			name: darkModeText[context.userDarkSetting],
			onClick: () =>
				context.setUserDarkSetting(
					context.userDarkSetting === "dark" ? "light" : "dark"
				),
		},
	];

	return (
		<div className="dark:bg-gray-900 w-full mx-auto flex justify-center items-start md:p-4 p-2 min-h-screen">
			<div className="card md:sticky md:block hidden md:top-4 top-2 md:mr-4">
				<div className="flex flex-col w-full bg-white dark:bg-gray-800 dark:border-gray-600">
					<div className="relative flex flex-col items-center mt-6">
						<div className="relative overflow-hidden object-cover w-24 h-24 mx-2 rounded-full">
							<Image
								src={
									"https://gravatar.loli.top/avatar/" +
									MD5("i@zkl2333.com")
								}
								alt="avatar"
								layout="fill"
							/>
						</div>
						<h4 className="mx-2 mt-2 text-xl font-medium text-gray-800 dark:text-gray-200 hover:underline">
							zkl2333
						</h4>
						<p className="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400 hover:underline">
							一个沙雕小前端
						</p>
					</div>

					<div className="flex flex-col justify-between flex-1 mt-6">
						<nav>
							{menuList.map((menu) =>
								menu.href ? (
									<Link key={menu.name} href={menu.href}>
										<a
											className="flex items-center justify-center px-4 py-2 mt-1 text-gray-600 transition-colors duration-200 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700 rounded-md overflow-hidden"
											onClick={menu.onClick}>
											<span className="mx-4 font-medium">
												{menu.name}
											</span>
										</a>
									</Link>
								) : (
									<span
										key={menu.name}
										className="flex items-center justify-center px-4 py-2 mt-1 text-gray-600 transition-colors duration-200 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700 rounded-md overflow-hidden"
										onClick={menu.onClick}>
										<span className="mx-4 font-medium">
											{menu.name}
										</span>
									</span>
								)
							)}
						</nav>
					</div>
				</div>
			</div>
			<div className="flex-1 max-w-2xl overflow-auto">{children}</div>
		</div>
	);
};

export default Layout;
