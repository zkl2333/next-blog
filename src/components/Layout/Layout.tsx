import Link from "next/link";
import React from "react";

const Layout: React.FC = ({ children }) => {
	return (
		<div className="w-full flex justify-center items-start md:p-4 p-2 md:space-x-4 space-x-2 min-h-screen ">
			<div className="card">
				<Link href={`/`}>首页</Link>
			</div>
			<div className="max-w-3xl">{children}</div>
		</div>
	);
};

export default Layout;
