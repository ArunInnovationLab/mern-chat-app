import express from "express";
import {
  signup,
  logout,
  login,
  checkAuth,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/authuser", checkAuth);

export default router;
