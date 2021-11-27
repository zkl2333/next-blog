import Link from "next/link";
import React from "react";

const Layout: React.FC = ({ children }) => {
	return (
		<div className="w-full mx-auto flex justify-center items-start md:p-4 p-2 min-h-screen ">
			<div className="card md:sticky md:block hidden md:top-4 top-2  md:mr-4">
				<Link href={`/`}>首页</Link>
			</div>
			<div className="flex-1 max-w-2xl overscroll-auto">{children}</div>
		</div>
	);
};

export default Layout;
