import { Response, Request } from "express";
import UserModel from "../model/User";
import jwt from "jsonwebtoken";

const loginToken = (req: Request, res: Response) => {
  if ((req.body.username || req.body.email) && req.body.password) {
    UserModel.findOne({
      $or: [
        { username: req.body.username },
        { email: req.body.username } // Assuming the email field is named 'email'
      ],
      password: req.body.password
    })
      .then(user => {
        if (user) {
          jwt.sign({ user }, "secretkey", { expiresIn: "120000s" }, (err, token) => {
            if (err) {
              return res.status(500).json({ message: "Token generation failed!" });
            }
            return res.status(200).json({ token });
          });
        } else {
          return res.status(401).json({ message: "Invalid credentials!" });
        }
      })
      .catch(error => {
        return res.status(500).json({ message: "An error occurred!" });
      });
  } else {
    return res.status(400).json({ message: "Fields are not provided!" });
  }
};

export default loginToken;
