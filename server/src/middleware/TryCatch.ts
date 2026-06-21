// make a trycatch handelaers

import { Request, Response, NextFunction, RequestHandler } from "express";

const TryCatch = (handler: RequestHandler): RequestHandler => {
  return async ( req: Request,res: Response,next: NextFunction):Promise<void> => {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default TryCatch;