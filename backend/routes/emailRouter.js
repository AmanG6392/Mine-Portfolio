import { Router } from "express";
import { sendContactEmail } from "../controller/emailController.js";

const router = Router();

router.post('/send',sendContactEmail)

export default router