import { User } from "../models/User";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import AsyncHandler from "../utils/AsyncHandler";
import { AvatarGenerator } from "random-avatar-generator";
import jwt from "jsonwebtoken";

export const Register = AsyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    throw new ApiError(400, "Please provide all required fields");
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }
  try {
    const avatarGenerator = new AvatarGenerator();
    const avatar = avatarGenerator.generateRandomAvatar();
    const user = await User.create({ userName, email, password, avatar });
    await user.save();
    return res.json(new ApiResponse(201, "User registered successfully"));
  } catch (error) {
    throw new ApiError(400, "User already exists");
  }
});


export const Login = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "Please provide all required fields");
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(400, "Invalid email or password");
    }
    const isMatch = await user.isPasswordCorrect(password);
    if (!isMatch) {
      throw new ApiError(400, "Invalid  password");
    }
    const token = jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN_SECRET as string,
      {
        expiresIn: "10d",
      }
    );
    const validUser = await User.findById({ _id : user._id }).select('-password')
    return res.json(
      new ApiResponse(
        200,
        { user: validUser, token: token },
        "User logged in successfully"
      )
    );
  } catch (error) {
    throw new ApiError(500, "Internal server error");
  }
});
