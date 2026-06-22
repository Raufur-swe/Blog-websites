import { JwtPayload } from "jsonwebtoken";

export interface IUserPayload extends JwtPayload {
  id: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUserPayload;
    }
  }
}

export {};