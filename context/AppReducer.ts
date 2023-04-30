import { GlobalContextProps } from "../interfaces";
import { Actions } from "../types";

export const AppReducer = (state: GlobalContextProps, action: Actions )  => {
  switch (action.type) {
    case "SET_USER_ID":
      return { ...state, user_id: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_THEME":
      return { ...state, theme: action.payload };
    case "RESET":
      return { ...state, action: null, error: null}
    default:
      return state;
    }
}