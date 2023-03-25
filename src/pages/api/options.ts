import type { NextApiRequest, NextApiResponse } from "next";

export const getOptions = async () => {
	try {
		const options: any[] = [];
		return Object.fromEntries(
			options.map((option) => [option.name, option.value])
		);
	} catch (error) {
		console.error(error);
		return {};
	}
};

const getOptionsApi = async (
	req: NextApiRequest,
	res: NextApiResponse<{ [key: string]: string | null }>
) => {
	res.status(200).json(await getOptions());
};

export default getOptionsApi;
