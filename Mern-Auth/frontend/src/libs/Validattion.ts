import z from "zod";


interface IUser  {
    username: string;
    password: string;
    email: string;
};

export const UserSignUpValidation: z.ZodType<IUser> = z.object({
    username: z.string().min(8).max(20),
    password: z.string().min(8),
    email: z.string().email(),

})

export const UserLoginValidation = z.object({
    password: z.string().min(8),
    email: z.string().email(),
})