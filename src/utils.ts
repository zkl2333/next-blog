import crypto from "crypto";

export const fetcher = (input: RequestInfo, init?: RequestInit | undefined) =>
	fetch(input, init).then((res) => res.json());

export const parseFromString = (text: string) => {
	const entityMap: { [key: string]: string } = {
		"&quot;": `"`,
		"&apos;": `'`,
		"&amp;": `&`,
		"&gt;": `>`,
		"&lt;": `<`,
		"&frasl;": `/`,
	};
	const regex: RegExp = /&[^;]*;/g;
	return text.replace(regex, (matchStr) => entityMap[matchStr] || matchStr);
};

export const MD5 = (text: string) => {
	var md5 = crypto.createHash("md5");
	return md5.update(text).digest("hex");
};
