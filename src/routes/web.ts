import express from "express";
import { registerUser } from "../controllers/studentControlers";
import loginToken from "../controllers/loginControlers";
import verifyToken from "../middleware/verifyToken";
import profileControlers from "../controllers/profileControlers";
import { deleteTodo, getTodoList, todoUpdate, todoDone } from "../controllers/todoControler";




const router = express.Router();

router.post("/register", registerUser);
router.post("/login",loginToken);
router.get("/profile", verifyToken, profileControlers);
router.post("/todo", verifyToken, todoUpdate);  
router.get("/todo", verifyToken, getTodoList); 
router.delete("/tododelete/:id", verifyToken, deleteTodo);
router.put("/done/:id", verifyToken, todoDone);


export default router

