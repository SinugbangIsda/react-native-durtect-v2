import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useLayoutEffect } from "react";
import { GlobalContext } from "../context/Global";

const useDarkMode = () => {
    const { theme, dispatch } = useContext(GlobalContext);

    const setTheme = async (value: "light" | "dark")  => {
        await AsyncStorage.setItem("theme", value);
        dispatch({
            type: "SET_THEME",
            payload: value,
        });
    };

    const getTheme = async () => {
        try {
            const val: any = await AsyncStorage.getItem("theme");
            if (val) {
                return setTheme(val);
            }
            setTheme("dark");
        } catch(e) {
            console.log(e);
        };
    };

    const renderTheme = () => {
        useLayoutEffect(() => {
            getTheme();
        }, [ theme ])
    }

    return { renderTheme, setTheme, theme }
}

export default useDarkMode;