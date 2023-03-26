/** @type {import('next').NextConfig} */
module.exports = {
	swcMinify: true,
	reactStrictMode: true,
	images: {
		domains: ["sdn.geekzu.org"],
	},
	devIndicators: {
		buildActivityPosition: "bottom-right",
	},
};
