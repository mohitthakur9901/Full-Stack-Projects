import { createSlice } from "@reduxjs/toolkit";
type Role = 'admin' | 'user';

type User = {
    _id: string;
    avatar:string
    userName: string;
    email: string;
    role: Role;
    createdAt: string;
    updatedAt: string;
}
interface UserState {
    user: User | null;
    token: string | null;
}

const initialState: UserState = {
    user: null,
    token: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
            state.token = action.payload.token;
        },
        clearUser(state) {
            state.user = null;
            state.token = null;
        }
    }
});
export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
  