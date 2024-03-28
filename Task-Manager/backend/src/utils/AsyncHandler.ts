import { Request, Response, NextFunction } from 'express';
interface CustomRequest extends Request {
    user?: any; 
}

const AsyncHandler = (requestHandler: (req: CustomRequest, res: Response, next: NextFunction) => Promise<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(requestHandler(req, res, next))
            .catch((err: any) => next(err));
    };
};

export default AsyncHandler;