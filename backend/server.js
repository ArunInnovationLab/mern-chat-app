import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/message.routes.js"
import connectToMongoDB from "./db/connectToMongoDB.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());

app.use(cookieParser());


dotenv.config();

const PORT = process.env.PORT;

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
  res.send(`Hello, this is the server running on port ${PORT}`);
});

app.listen(PORT, () => {
  connectToMongoDB();
  console.log("server started on port", PORT);
});
