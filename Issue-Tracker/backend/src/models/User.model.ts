import mongoose, {Schema, Document} from "mongoose";

import bcrypt from 'bcrypt';

enum UserRole {
    USER = 'user',
    ADMIN = 'admin'
}

interface UserSchemaType extends Document {
    name: string;
    email: string;
    password: string;
    avatar?: string;
    Admin: boolean;
    Role: UserRole;
    isPasswordCorrect(password: string): Promise<boolean>;
    generateToken(): string;
}

const UserSchema = new Schema<UserSchemaType>({
    name: {type: String, required: true , unique :true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    avatar: {type: String},
    Role: { type: String, enum: Object.values(UserRole), default: UserRole.USER },
}, {timestamps: true});

UserSchema.pre<UserSchemaType>('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
 });

 UserSchema.methods.isPasswordCorrect = async function(password : string){
    return await bcrypt.compare(password, this.password)
};

export const User = mongoose.model('User', UserSchema);

