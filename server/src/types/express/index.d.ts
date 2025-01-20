import type { JwtPayload } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
  role?: string;
}

declare global {
  namespace Express {
    export interface Request {
      user?: CustomJwtPayload;
    }
  }
}
