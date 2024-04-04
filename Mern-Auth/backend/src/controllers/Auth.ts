import { User } from "../models/User";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import AsyncHandler from "../utils/AsyncHandler";
import { UserSignUpValidation, UserLoginValidation } from "../libs/Validattion";
import bcrypt from "bcrypt";


const generateAccessAndRefreshToken = async (userId: string) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateAccessToken();

        user.refresh_token = refreshToken;
        await user.save({
            validateBeforeSave: false
        });

        return {
            accessToken,
            refreshToken,
        }

    } catch (error) {
        console.error(error);
        throw new ApiError(500, "Internal Server Error");

    }
}

const options = {
    httpOnly: true,
    secure: true,
};

export const Register = AsyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const validateUser = UserSignUpValidation.safeParse(req.body);
    if (!validateUser.success) {
        throw new ApiError(400, validateUser.error.message);
    }

    const existingUser = await User.findOne({
        $or: [{ username }, { email }],
    })
    if (existingUser) {
        throw new ApiError(400, "User already exists");
    }
    try {
        const user = await User.create({
            username,
            email,
            password
        });

        await user.save();
        console.log(user);

        const createdUser = await User.findById(user._id).select("-password  -refresh_token");
        return res.json(new ApiResponse(200, createdUser, "User created successfully"));
    } catch (error) {
        console.error(error);
        res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
    }
});


export const Login = AsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const validateUser = UserLoginValidation.safeParse(req.body);

    if (!validateUser.success) {
        throw new ApiError(400, validateUser.error.message);
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new ApiError(400, "Invalid email or password");
        }
        const isMatch = await user.isPasswordCorrect(password);
        if (!isMatch) {
            throw new ApiError(400, "Invalid password");
        }
        const { refreshToken, accessToken }: any = await generateAccessAndRefreshToken(user._id);


        const loggedInUser = await User.findById(user._id).select("-password");

        return res
            .status(200)
            .cookie("refreshToken", refreshToken, options)
            .cookie("accessToken", accessToken, options)
            .json(new ApiResponse(200, loggedInUser, "User logged in successfully"));

    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
    }
});


export const LoginWithGoogle = AsyncHandler(async (req, res) => {
    const { username, email } = req.body;
    try {
        const exisitingUser = await User.findOne({ email });

        if (exisitingUser) {
            const { password, ...rest } = exisitingUser._doc;

            const { refreshToken, accessToken }: any = await generateAccessAndRefreshToken(exisitingUser._id); // check later type of these
            return res
                .status(200)
                .cookie("refreshToken", refreshToken, options)
                .cookie("accessToken", accessToken, options)
                .json(new ApiResponse(200, rest, "User logged in successfully"));
        } else {

            const generatedPassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);

            const hanshedPassword = await bcrypt.hash(generatedPassword, 10);
            const user = await User.create({
                username,
                email,
                password: hanshedPassword
            });
            const { refreshToken, accessToken }: any = await generateAccessAndRefreshToken(user._id);
            return res
                .status(200)
                .cookie("refreshToken", refreshToken, options)
                .cookie("accessToken", accessToken, options)
                .json(new ApiResponse(200, user, "User logged in successfully"));
        }

    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
    }

})


export const Logout = AsyncHandler(async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user._id,
            {
                $set: {
                    refresh_token: null,
                    access_token: null,
                }
            },
            {
                new: true,
            }
        );
        return res
            .status(200)
            .clearCookie("refreshToken", options)
            .clearCookie("accessToken", options)
            .json(new ApiResponse(200, null, "User logged out successfully"));

    } catch (error) {
        console.error(error);
        res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
    }
})