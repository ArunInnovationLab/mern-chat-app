import mongoose from "mongoose";
const connectToMongoDB = async () => {
  await mongoose
    .connect("mongodb://127.0.0.1:27017/chat-app")
    .then(() => console.log("Connected to MongoDB!"))
    .catch((err) => console.error("Failed to connect to MongoDB:", err));
};


export default connectToMongoDB;