import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError';
import AsyncHandler from '../utils/AsyncHandler';


const verifyToken = AsyncHandler(async (req, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]; 
    if (!token) {
        return next(new ApiError(401 , 'No token provided'));
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
        if (!decoded) {
            return next(new ApiError(401, 'Invalid token'));
        }
        req.user = decoded;
        next();
    } catch (error) {
        return next(new ApiError(401 , 'Invalid token'));
    }
})

export default verifyToken;
