import { User } from "../models/User";
import ApiResponse from "../utils/ApiResponse";
import AsyncHandler from "../utils/AsyncHandler";
import { AvatarGenerator } from "random-avatar-generator";


const avatarGenerator = new AvatarGenerator();


export const generateAvatar = AsyncHandler(async (req, res) => {
    const avatar = avatarGenerator.generateRandomAvatar();
    // console.log(avatar);
    
  try {
    
    const user = await User.findById({
        _id: req.user.id
    });
    if (!user) {
        return res.json(new ApiResponse(404, 'User not found'));
    }
    user.avatar = avatar;
    await user.save();
    // console.log(user);
    return res.json(new ApiResponse(200,{avatar: user.avatar}, 'User updated successfully'));

  } catch (error) {
    console.log(error);
    return res.json(new ApiResponse(500, 'Internal server error'));
    
  }
})

export const updateUser = AsyncHandler(async (req, res) => {
    // console.log(req.user.id);
    
    // console.log(req.body);
    
   try {
    
    const user = await User.findById({
        _id: req.user.id
    });
    if (!user) {
        return res.json(new ApiResponse(404, 'User not found'));
    }
    user.userName = req.body.userName;
    user.email = req.body.email;
    user.password = req.body.password;
    (await user.save());
    return res.json(new ApiResponse(200, 'User updated successfully'));
   } catch (error) {
    console.log(error);
    return res.json(new ApiResponse(500, 'Internal server error'));
   }
});

export const getUsers = AsyncHandler(async (req, res) => {
    const users = await User.find();
    return res.json(new ApiResponse(200, users , 'Users fetched successfully'));
})

export const getUser = AsyncHandler(async (req, res) => {
    const user = await User.findById({
        _id: req.params.id,
    });
    return res.json(new ApiResponse(200, user, 'User fetched successfully'));
})

export const deleteUser = AsyncHandler(async (req, res) => {
    const user = await User.findByIdAndDelete({
        _id: req.params.id,
    });
    return res.json(new ApiResponse(200, user, 'User deleted successfully'));
})

export const updateToAdmin = AsyncHandler(async (req, res) => {
    console.log(req.params.id);
    
    const user = await User.findById({
        _id: req.params.id,
    });
    if (!user) {
        return res.json(new ApiResponse(404, 'User not found'));
    }
    user.role = "admin";
    await user.save();
    return res.json(new ApiResponse(200, user, 'User updated successfully'));
})