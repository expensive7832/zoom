"use client"
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// interface userDataProps{
//     name: string;
//     email: string;
//     password: string;
//     _id: string;
//     phoneNumber: string;
//     admin: boolean;
//     staff: boolean;
//     active: boolean;
//     imgUrl: string;
//     imgId: string;
//     token: string;
// }


interface userProps{
    login: boolean;
    token?: string;

}



const initialState: userProps = {
    login: false,
    token: ""
    
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, {payload}) => {
            state.login = true;
            state.token = payload
            
        },
        logout: (state) => {
            state.login = false;
            state.token = ""
        },
        
    }
})


export default userSlice.reducer;
export const { login, logout } = userSlice.actions;