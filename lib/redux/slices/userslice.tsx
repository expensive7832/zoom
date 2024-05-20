"use client"

import { createSlice } from "@reduxjs/toolkit";


interface userProps{
    login: boolean;
    info: {
        uid: string;
        email: string;
        name: string;
        photoURL: string;
    }

}



const initialState: userProps = {
    login: false,
    info: {
        uid: "",
        email: "",
        name: "",
        photoURL: ""
    }
    
};

const userSlice: any = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, {payload}) => {
            state.login = true;
            state.info = payload
            
        },
        logout: (state) => {
            state.login = false;
            state.info = {
                uid: "",
                email: "",
                name: "",
                photoURL: ""
            }
        },
        
    }
})


export default userSlice.reducer;
export const { login, logout } = userSlice.actions;