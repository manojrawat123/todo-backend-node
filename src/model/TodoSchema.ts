import mongoose, { Document, Schema }  from "mongoose";

interface ITodo extends Document {
    user: mongoose.Types.ObjectId;
    title: string,
    desc: string;
    completed: boolean;
  }

const todoSchema: Schema<ITodo> = new mongoose.Schema({
    user: {type: Schema.Types.ObjectId,ref: "student", required: true},

    title: {type: String, required: true},
    desc: {type: String, required: true},
    completed: {type: Boolean, default: false}
})


const todoModel = mongoose.model("todo",todoSchema);

export default todoModel;