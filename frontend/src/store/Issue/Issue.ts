import { createSlice } from "@reduxjs/toolkit";
type IssueStatus = "open" | "closed" | "in_progress";

interface IssueProps {
    _id: string
    title: string;
    description: string;
    status: IssueStatus;
    reporter:string;
    createdAt: Date;
    updatedAt: Date;
}

const initialState: IssueProps[] = [];
const issuesSlice = createSlice({
    name: "issues",
    initialState,
    reducers: {
        setIssue(state, action) {
            state.push(action.payload);
            return state;
        }
    }
})