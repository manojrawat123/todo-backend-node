import { Request, Response } from "express"

interface CustomRequest extends Request {
    user?: any;
  }

const profileControlers = (req: CustomRequest, res: Response)=>{
    console.log("____Profile_controler_____")
    console.log(req.user)
    res.status(200).json({message: "Token Veryfied"});

}

export default profileControlers;