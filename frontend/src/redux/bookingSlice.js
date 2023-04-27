import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    resort_id : null
}

const bookingSlice = createSlice({
    name: "resort_id",
    initialState: INITIAL_STATE,
    reducers: {
        updateResortId: (state, action)=>{
            state.resort_id = action.payload
        }
    }

})

export const { updateResortId } = bookingSlice.actions;
export default bookingSlice.reducer