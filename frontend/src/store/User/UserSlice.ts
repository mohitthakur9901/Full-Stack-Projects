import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface User {
    _id: string;
    name: string;
    email: string;
    avatar: string;
    Role: string;
    Admin: boolean;
    createdAt: string;
    updatedAt: string;
}

interface UserState {
    loggedInUser: User;
    token: string;
}

const initialState: UserState = {
    loggedInUser: {
        _id: "",
        name: "",
        email: "",
        avatar: "",
        Role: "",
        Admin: false,
        createdAt: "",
        updatedAt: ""
    },
    token: ""
};

const createslice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            // Modify state properties instead of assigning the whole payload to state
            state.loggedInUser = action.payload.loggedInUser;
            state.token = action.payload.token;
            console.log(state.loggedInUser);
            
        },
        clearUser: (state) => {
            state.loggedInUser = {
                _id: "",
                name: "",
                email: "",
                avatar: "",
                Role: "",
                Admin: false,
                createdAt: "",
                updatedAt: ""
            }
            state.token = "";
        },

    }

});


export const { setUser, clearUser } = createslice.actions;
export default createslice.reducer;