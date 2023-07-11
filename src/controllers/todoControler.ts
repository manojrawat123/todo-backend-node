import { Response, Request } from "express";
import todoModel from "../model/TodoSchema";
import connectDb from "../db/connect";
import { ObjectId } from "mongoose";


interface CustomRequest extends Request {
   user?: any;
 }

 export const todoUpdate = async(req: CustomRequest, res: Response)=>{
      console.log(req.body)
   if (!req.user.user?._id || !req.body.title || !req.body.desc ){
     return res.status(400).json({"Bad Request": "Missing required fields"});
   }
   
   if (typeof req.body.title !== "string" || typeof req.body.desc !== "string") {
      res.status(400).json({ error: "Invalid data type" });
      return;
    }

    
  
    if (req.user.title === "" || req.user.desc === "" ) {
      res.status(400).json({ error: "Fields cannot be empty" });
      return;
    }
   const todoPost = new todoModel({
      user: req.user.user._id,
      title: req.body.title,
      desc: req.body.desc,
   })
   const saveTodo = await todoPost.save()
   return res.status(201).json({"ok": "Todo Created Sucessfully"});  
}


// get todos
export const getTodoList = async (req: CustomRequest, res: Response)=>{
   const myId = req.user.user._id
   console.log(myId)
   const data = await todoModel.find({user: myId});
   res.status(200).json({data});
   
}


export const deleteTodo = async (req:CustomRequest, res: Response)=>{

   try {
      console.log("Delete Todo is running")
      const id = req.params.id
   const user = req.user.user._id
   console.log("___id___")
   console.log(id);
   console.log("____user_____")
   console.log(user);
   const data = await todoModel.deleteOne({_id: id, user: user});
   console.log("error")
   return res.status(200).json({"message":"Deleted Sucessfully"})
   } catch (error) {
      console.log("Debug error")
      return res.status(500).json({"error": "Internal Server Error"})
   }
}


export const todoDone = async(req:CustomRequest, res: Response)=>{
   try {
      console.log("Delete Todo is running")
      const id = req.params.id
   const user = req.user.user._id
   console.log("___id___")
   console.log(id);
   console.log("____user_____")
   console.log(user);
   const data1 = await todoModel.findOne({_id: id, user: user });
   const complete = data1?.completed
   console.log('complete', complete);
   if (complete){
      const data = await todoModel.updateOne({_id: id, user: user}, {$set:{completed: false}});
   }
   else{
      const data = await todoModel.updateOne({_id: id, user: user}, {$set:{completed: true}});
   }

   return res.status(200).json({"message":"Deleted Sucessfully"})
   } catch (error) {
      console.log("Debug error")
      return res.status(500).json({"error": "Internal Server Error"})
   }
}