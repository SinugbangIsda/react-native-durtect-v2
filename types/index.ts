import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PayloadAction } from "@reduxjs/toolkit";
import { store } from "../redux/store";

export type AuthState = {
    userId: string;
    theme: "light" | "dark";
};

export type RootStackParamList = {
    "Home": undefined;
    "About": undefined;
    "Results": undefined | any;
    "Loading": undefined;
    "History": undefined | Object;
    "Diseases": undefined | Object;
    "WhatsNew": undefined;
};

export type StackNavigationType = NativeStackNavigationProp<RootStackParamList>;

export type Actions = 
    | { type: "SET_THEME", payload: "light" | "dark" }
    | { type: "SET_ERROR", payload: string }
    | { type: "SET_USER_ID", payload:  string }
    | { type: "SET_IMAGE", payload: FormData }
    | { type: "RESET" }

export type AuthActions = PayloadAction<AuthState>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;