import { Router } from "express";
import aicontroller from "../controller/aicontroller.js"

const router = Router();

router.get('/getAi-result',aicontroller)

export default router