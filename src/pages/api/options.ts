import type { NextApiRequest, NextApiResponse } from "next";
import { Option } from "@prisma/client";
import prismaClient from "../../prismaClient";

export const getOptions = async () => {
	try {
		const options = await prismaClient.option.findMany();
		return options;
	} catch (error) {
		console.error(error);
		return [];
	}
};

const getOptionsApi = async (
	req: NextApiRequest,
	res: NextApiResponse<Option[]>
) => {
	res.status(200).json(await getOptions());
};

export default getOptionsApi;
