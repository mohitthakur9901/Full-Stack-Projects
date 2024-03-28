import { task } from "../models/Task";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import AsyncHandler from "../utils/AsyncHandler";

export const createTask = AsyncHandler(async (req, res) => {
    console.log(req.body);
    
    const { title, description ,assignedTo } = req.body;
    if (!title || !description || !assignedTo) {
        throw res.json(new ApiError(400, "Please provide all required fields"))
    }
    try {
        const newTask = await task.create({ title, description, assignedTo });
        await newTask.save(); 
        return res.json(new ApiResponse(201,newTask, "Task created successfully"))
    } catch (error) {
        throw new ApiError(500, "Internal Server Error");
    }
})

export const getTasks = AsyncHandler(async (req, res) => {
    const tasks = await task.find();
    return res.json(new ApiResponse(200, tasks, "Tasks fetched successfully"))
})

export const getTask = AsyncHandler(async (req, res) => {
    const getTask = await task.findById(req.params.id);
    if (!getTask) {
        throw new ApiError(404, "Task not found");
    }
    return res.json(new ApiResponse(200, getTask, "Task fetched successfully"))
})

export const deleteTask = AsyncHandler(async (req, res) => {
    const getTask = await task.findByIdAndDelete(req.params.id);
    if (!getTask) {
        throw new ApiError(404, "Task not found");
    }
    return new ApiResponse(200, getTask, "Task deleted successfully");
})

export const updateTask = AsyncHandler(async (req, res) => {
    const getTask = await task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!getTask) {
        throw new ApiError(404, "Task not found");
    }
    return res.json(new ApiResponse(200, getTask, "Task updated successfully"))
})