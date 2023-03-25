import React from "react";

export const DarkContext = React.createContext<{
	userDarkSetting: UserDarkSetting;
	setUserDarkSetting: (userDarkSetting: UserDarkSetting) => void;
}>({
	userDarkSetting: "auto",
	setUserDarkSetting: () => {},
});

export const OptionsContext = React.createContext<any[]>([]);
