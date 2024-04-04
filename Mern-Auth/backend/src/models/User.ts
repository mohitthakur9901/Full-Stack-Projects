import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

type UserRole = "admin" | "user";

// add fields according to your needs 
interface IUser {
    username: string;
    password: string;
    email: string;
    role: UserRole;
    access_token: string;
    refresh_token: string;
};

export interface UserDocument extends IUser, Document {
    _doc: IUser;
    isPasswordCorrect: (password: string) => Promise<boolean>;
    generateAccessToken: () => string;
    generateRefreshToken: () => string;
}

export interface UserModel extends Model<UserDocument> {}

const userSchema = new mongoose.Schema<UserDocument>({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    },
    access_token: {
        type: String,
        default: ""
    },
    refresh_token: {
        type: String,
        default: ""
    },
});

userSchema.pre<UserDocument>("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.isPasswordCorrect = async function (password: string) {
    return await bcrypt.compare(password, this.get('password'));
}
userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email,
        role : this.role,
    }, process.env.ACCESS_TOKEN_SECRET as string,{
        expiresIn: process.env.ACCESS_TOKEN_SECRET as string,
    })
};

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id: this._id,
      
    }, process.env.REFRESH_TOKEN_SECRET as string,{
        expiresIn: process.env.REFRESH_TOKEN_EXPIRTY as string,
    })
};

export const User = mongoose.model<UserDocument , UserModel>("User", userSchema);
