import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthContext";
import bookingSlice from "./bookingSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        booking: bookingSlice
    }
})