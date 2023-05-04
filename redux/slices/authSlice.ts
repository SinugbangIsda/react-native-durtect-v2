import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface AuthProps {
  userID: string;
};

const initialState: AuthProps = {
  userID: ""
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
  
  export const { setUserID } = authSlice.actions;
  export const selectCurrentUserID = (state: RootState) => state.auth.userID;
  
  export default authSlice.reducer;