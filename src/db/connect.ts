import mongoose from "mongoose";



const db:string = "mongodb+srv://munnapassword:%24486R%23a%26n%28%29i@cluster0.qivzqqh.mongodb.net/manojdb?retryWrites=true&w=majority";

const connectDb = async (): Promise<void> => {
  try {
    await mongoose.connect(db);
    console.log("Database connected successfully!!");
  } catch (error) {
    console.log("Error Occurred!!");
  }
};


export default connectDb;
