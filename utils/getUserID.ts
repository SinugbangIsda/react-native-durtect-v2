import AsyncStorage from "@react-native-async-storage/async-storage";
import { nanoid } from "@reduxjs/toolkit";

const generateUserID = async () => {
    const newUserID = nanoid(7);
    await AsyncStorage.setItem("userID", newUserID);
    return newUserID;
};

export const getUserID = async () => {
    const storedUserID = await AsyncStorage.getItem("userID");
    if (storedUserID) {
        return storedUserID;
    } else {
        return generateUserID();
    }
};