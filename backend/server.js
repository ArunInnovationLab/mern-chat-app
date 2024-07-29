// import express from "express";
// import dotenv from "dotenv";
// import authRoutes from "./routes/auth.routes.js";
// import userRoutes from "./routes/user.routes.js";
// import messageRoutes from "./routes/message.routes.js"
// import connectToMongoDB from "./db/connectToMongoDB.js";
// import cookieParser from "cookie-parser";
// const app = express();

// app.use(express.json());

// app.use(cookieParser());


// dotenv.config();

// const PORT = process.env.PORT;

// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/messages", messageRoutes);

// app.get("/", (req, res) => {
//   res.send(`Hello, this is the server running on port ${PORT}`);
// });

// app.listen(PORT, () => {
//   connectToMongoDB();
//   console.log("server started on port", PORT);
// });


import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/message.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import cookieParser from "cookie-parser";

const app = express();

// Load environment variables
dotenv.config();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Update with your frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 2000;

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

// Test route
app.get("/", (req, res) => {
  res.send(`Hello, this is the server running on port ${PORT}`);
});

// Start server
app.listen(PORT, () => {
  connectToMongoDB();
  console.log("server started on port", PORT);
});
