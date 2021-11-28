import Link from "next/link";
import React, { useContext } from "react";
import { DarkContext } from "../../pages/_app";

const Layout: React.FC = ({ children }) => {
	const context = useContext(DarkContext);
	return (
		<div className="dark:bg-gray-900 w-full mx-auto flex justify-center items-start md:p-4 p-2 min-h-screen ">
			<div className="card md:sticky md:block hidden md:top-4 top-2  md:mr-4">
				<Link href={`/`}>首页</Link>
				<div
					onClick={() =>
						context.setUserDarkSetting(
							context.userDarkSetting === "dark"
								? "light"
								: "dark"
						)
					}>
					切换夜间模式
				</div>
			</div>
			<div className="flex-1 max-w-2xl overflow-auto">{children}</div>
		</div>
	);
};

export default Layout;
