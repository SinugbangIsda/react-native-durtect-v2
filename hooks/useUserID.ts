import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { GlobalContext } from "../context/Global";
import { nanoid } from "nanoid";
import "react-native-get-random-values";

const useUserID = () => {
    const { dispatch, user_id } = useContext(GlobalContext);
    const handleID = async (value: string)  => {
        await AsyncStorage.setItem("user_id", value);
        dispatch({
            type: "SET_USER_ID",
            payload: value
        });
    };
    const getID = async () => {
        try {
            const val: any = await AsyncStorage.getItem("user_id");
            if (val) {
                return handleID(val);
            }
            handleID(nanoid(7));
        } catch(e) {
            console.log(e);
        };
    };

    return { getID, user_id }
}

export default useUserID;
