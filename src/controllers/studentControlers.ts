import express, {Request, Response} from "express";
import mongoose, { Document, Schema } from "mongoose";
import UserModel from "../model/User";


const registerUser = async(req: Request, res: Response)=>{

    try {
    const { username, password, email, name, age, city } = req.body;
        console.log(req.body);

    if (!username || !password || !email || !name || !age || !city) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

    
    const existingUser = await UserModel.findOne({ $or: [{ username }, { email }] });
    if (existingUser){
        return res.status(409).json({ message: 'Username or email already exists' });
    }

    if (typeof username !== "string" || typeof password !== "string" || typeof email !== "string" || typeof name !== "string" || typeof city !== "string" || typeof age !== "number") {
        res.status(400).json({ error: "Invalid data type" });
        return;
      }
    
      if (username.trim() === "" || password.trim() === "" || email.trim() === "" || name.trim() === "" || city.trim() === "") {
        res.status(400).json({ error: "Fields cannot be empty" });
        return;
      }


     // Perform individual field validations
     if (age < 18) {
        return res.status(400).json({ field: 'age', message: 'Age should be at least 18' });
      }
  
      if (age > 60) {
        return res.status(400).json({ field: 'age', message: 'Age should not exceed 60' });
      }

    const newUser = new UserModel({
         username, password, email, name, age, city 
    })

    await newUser.save();
    res.status(201).json({"message": "User Created Sucessfully", user: newUser});
} catch (error: mongoose.Error.ValidationError | any) {
    if (error instanceof mongoose.Error.ValidationError) {
      // Handle validation errors
      res.status(400).json({ error: error.message });
    } else {
      // Handle other errors
      console.error(error);
      res.status(500).json({ error: "Something went wrong"});
    }
    }
}


export {registerUser};
 