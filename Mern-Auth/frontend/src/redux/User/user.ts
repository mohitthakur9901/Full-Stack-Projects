import { createSlice } from "@reduxjs/toolkit";


type UserRole = "admin" | "user";

interface IUser {
    username: string;
    email: string;
    role: UserRole;
    access_token: string;
    refresh_token: string;
};

const initialState: IUser = {
    username: "",
    email: "",
    role: "user",
    access_token: "",
    refresh_token: "",
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.role = action.payload.role;
            state.access_token = action.payload.access_token;
            state.refresh_token = action.payload.refresh_token;
        }
    }
})

export const { setUser } = userSlice.actions;
export default userSlice.reducer;