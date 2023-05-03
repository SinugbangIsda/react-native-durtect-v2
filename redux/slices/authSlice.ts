import { createSlice, nanoid } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from '../store';

interface AuthProps {
  userID: string;
};

const initialState: AuthProps = {
  userID: ""
};

const generateUserID = async () => {
    const newUserID = nanoid(7);
    await AsyncStorage.setItem("userID", newUserID);
    return newUserID;
};
  
const getUserID = async () => {
    const storedUserID = await AsyncStorage.getItem("userID");
    if (storedUserID) {
      return storedUserID;
    } else {
      return generateUserID();
    }
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      setUserID: (state, action) => {
        state.userID = action.payload;
      },
    },
  });
  
  export const initializeUserID = () => async (dispatch: any) => {
    const userID = await getUserID();
    dispatch(setUserID(userID));
  };
  
  export const { setUserID } = authSlice.actions;
  export const selectCurrentUserID = (state: RootState) => state.auth.userID;
  
  export default authSlice.reducer;