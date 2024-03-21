import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError';



const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.body);
    const token = req.header?.('Authorization')?.split(" ")[1];
   try {
     if (!token) {
         throw new ApiError(401, "Unauthorized: Token missing");
     }
    //  console.log(token);
 
     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
     if (!decoded) {
         throw new ApiError(401, "Unauthorized");
     }     
     next();
   } catch (error:any) {
     console.log(error);
     next(error);
     return;
    
   }
};

export default verifyToken;
