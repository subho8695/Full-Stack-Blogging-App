import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../Features/UserSlice"
export const store = configureStore({
    reducer:{
        user:UserReducer
    }
})