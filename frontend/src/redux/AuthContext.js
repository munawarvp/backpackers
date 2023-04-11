import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    user: null,
    authToken: null,
    count: 0
}

const authSlice = createSlice({
    name: "auth",
    initialState: INITIAL_STATE,
    reducers: {
        change: (state)=> {
            state.count = 1;
        },
        updateAuthToken:(state,action)=>{
            state.authToken = action.payload;
        },
        updateUser:(state,action)=>{
            state.user = action.payload;
        }
    }

})

export const { change, updateAuthToken, updateUser } = authSlice.actions 

export default authSlice.reducer