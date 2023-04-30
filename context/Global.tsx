import React, { createContext, useReducer } from "react";
import { AppReducer } from "./AppReducer";
import { GlobalContextProps, JSXChildrenProps } from "../interfaces";

const INITIAL_STATE: GlobalContextProps = {
    user_id: null,
    error: null,
    theme:  null,
    dispatch() {
        return() => {}
    }
};

export const GlobalContext = createContext(INITIAL_STATE);

export const GlobalProvider = ({ children }: JSXChildrenProps) => {
    const [state, dispatch] = useReducer(AppReducer, INITIAL_STATE);
    
    return (
        <GlobalContext.Provider 
            value = {{
                user_id: state.user_id,
                error: state.error,
                theme: state.theme,
                dispatch
            }}
        >
            { children }
        </GlobalContext.Provider>
    )
}
