import mongoose, { Document, Model } from "mongoose";
import bcrypt from 'bcrypt';

type Role = 'admin' | 'user';


interface UserBase {
    avatar: string;
    userName: string;
    email: string;
    role: Role;
    password: string;
}

export interface UserDocument extends UserBase, Document {
    isPasswordCorrect: (password: string) => Promise<boolean>;
}

export interface UserModel extends Model<UserDocument> {}

const userSchema = new mongoose.Schema<UserDocument>({
    avatar: {
        type: String,
    },
    userName: {
        type: String,
        required: true,
    },
    role:{
        type: String,
        default: 'user',
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

userSchema.pre<UserDocument>('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.isPasswordCorrect = async function (password: string) {
    return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model<UserDocument, UserModel>('User', userSchema);
