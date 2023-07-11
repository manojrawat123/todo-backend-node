import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true },
    password: {type: String, required: true},
    email: {type: String , required: true, unique: true},
    name: {type: String, required: true},
    age: {type: Number, required: true, min: 18, max: 60},
    city: {type: String, required: true}
})


/// Model
const UserModel = mongoose.model("student",UserSchema)

export default UserModel;