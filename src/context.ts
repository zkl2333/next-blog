import React from "react";
import { Option } from "@prisma/client";

export const DarkContext = React.createContext<{
	userDarkSetting: UserDarkSetting;
	setUserDarkSetting: (userDarkSetting: UserDarkSetting) => void;
}>({
	userDarkSetting: "auto",
	setUserDarkSetting: () => {},
});

export const OptionsContext = React.createContext<Option[]>([]);
