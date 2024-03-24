import { User } from "../models/User.model";
import { Request, Response } from "express";
import AsyncHandler from "../utils/AsyncHandler";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import { AvatarGenerator } from 'random-avatar-generator';
import Jwt  from "jsonwebtoken";



const RegisterUser = AsyncHandler(async (req: Request, res: Response) => {
    
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        throw new ApiError(400, "Please provide all required fields");
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new ApiError(400, "User already exists");
    }
    const findByName = await User.findOne({name})
    if (findByName) {
        throw new ApiError(400, "Select Another UserName");
    }
    try {
        const generator = new AvatarGenerator();
        const user = await User.create({
            name,
            email,
            password,
            avatar: generator.generateRandomAvatar('avatar')
        });
        await user.save();
        return res.status(201).json(new ApiResponse(201, user));

    } catch (error: any) {
        throw new ApiError(500, error);
    }
});


const LoginUser = AsyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError(400, "Please provide all required fields");
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new ApiError(400, "User not found");
        }
        const isPasswordCorrect = await user.isPasswordCorrect(password);
        if (!isPasswordCorrect) {
            throw new ApiError(400, "Invalid credentials");
        }
        const token = Jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET!);

       
        const loggedInUser = await User.findById(user._id).select('-password');
        return res.json(new ApiResponse(200, {loggedInUser , token}));
    } catch (error: any) {
        throw new ApiError(500, error);
    }
});


const GetUsers = AsyncHandler(async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        // console.log(users);
        
        return res.json(new ApiResponse(200, users));
    } catch (error : any) {
        throw new ApiError(500, error);
    }
});


const UpdateUser = AsyncHandler(async (req: Request, res: Response) => {
    const {email , password} = req.body;
    try {
        const user = await User.findByIdAndUpdate(req.params.id,{
            email,
            password
        }, { new: true  });
        const validUser = await User.findById(req.params.id).select('-password');
        return res.json(new ApiResponse(200, validUser));
    } catch (error: any) {
        throw new ApiError(500, error);
    }
});


const DeleteUser = AsyncHandler(async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        return res.json(new ApiResponse(200, user));
    } catch (error: any) {
        throw new ApiError(500, error);
    }
});

// update to admin
const updateToAdmin = AsyncHandler(async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id,{
            Role: "admin"
        }, { new: true  });
        const validUser = await User.findById(req.params.id).select('-password');
        return res.json(new ApiResponse(200, validUser));
    } catch (error: any) {
        throw new ApiError(500, error);
    }
})

const totalUsers = AsyncHandler(async (req: Request, res: Response) => {
    try {
        const users = await User.countDocuments();
        return res.json(new ApiResponse(200, users));
    } catch (error: any) {
        throw new ApiError(500, error);
    }
})

export { RegisterUser, LoginUser, GetUsers, UpdateUser ,DeleteUser , updateToAdmin , totalUsers};