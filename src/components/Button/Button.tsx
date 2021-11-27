import React, { HTMLAttributes } from "react";
import styles from "./Button.module.css";

interface IProps extends HTMLAttributes<HTMLDivElement> {
	disabled?: boolean;
	type?: "default" | "text" | "link";
}

const Button: React.FC<IProps> = (props) => {
	const {
		children,
		className = "",
		disabled = false,
		type = "default",
	} = props;
	const commonClass = styles.button;
	switch (type) {
		case "link":
			return (
				<span
					{...props}
					className={`${commonClass} ${className}  text-blue-600 dark:text-blue-400 hover:underline`}>
					{children}
				</span>
			);
		default:
			return (
				<div
					{...props}
					className={`${commonClass} ${className} text-center px-4 py-2 rounded-md focus:ring focus:ring-indigo-300 focus:ring-opacity-80 ${
						!disabled
							? "text-white bg-indigo-600 hover:bg-indigo-500"
							: "cursor-not-allowed text-gray-400 bg-gray-300"
					}`}>
					{children}
				</div>
			);
	}
};

export default Button;
