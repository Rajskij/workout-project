import express from "express";
import { createUser, loginUser } from "../controller/authController.js";

const router = express.Router();

router
    .route('/login')
    .post(loginUser);

router
    .route('/signup')
    .post(createUser);

export default router;
