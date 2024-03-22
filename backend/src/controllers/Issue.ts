import { Issue } from "../models/Issue.model";
import { User } from "../models/User.model";
import { Request, Response } from "express";
import AsyncHandler from "../utils/AsyncHandler";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";


const createIssue = AsyncHandler(async (req: Request, res: Response) => {
    const { title, description, reporter } = req.body;

    if (!title || !description || !reporter) {
        throw new ApiError(400, "title, description and reporter are required");
    }
    const issue = await Issue.create({ title, description, reporter });
    await issue.save();
    return res.json(new ApiResponse(200, issue, "Issue created successfully"));

})

const updateIssue = AsyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const issue = await Issue.findById(id);
    if (!issue) {
        throw new ApiError(404, "Issue not found");
    }
    issue.status = req.body.status;
    await issue.save();
    return res.json(new ApiResponse(200, issue, "Issue updated successfully"));

})


const getAllIssues = AsyncHandler(async (req: Request, res: Response) => {
    try {   
        const issues = await Issue.find(req.query);
    
        res.json(new ApiResponse(200, issues, "Issues fetched successfully"));
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching issues' });
      }
})

// count all issues
const countIssues = AsyncHandler(async (req: Request, res: Response) => {
    const count = await Issue.countDocuments();
    res.json(new ApiResponse(200, count, "Issues count fetched successfully"));
})

export { getAllIssues, createIssue, updateIssue , countIssues };
