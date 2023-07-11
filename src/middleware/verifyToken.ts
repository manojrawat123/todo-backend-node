import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, decode } from "jsonwebtoken";

interface CustomRequest extends Request {
  user?: any;
}

const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token: string | undefined = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Token not provided!" });
  }

  const tokenWithoutPrefix: string = token.replace("Bearer ", "");

  jwt.verify(tokenWithoutPrefix, "secretkey", (err, decoded) => {
    if (err) {
      return res.status(401).json({ "message": "Invalid token!" });
    }
    req.user = decoded;
    // console.log(req.user);
    next();
  });  
};

export default verifyToken;

