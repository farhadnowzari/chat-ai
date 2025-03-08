import { Router } from "express";
import { AiController } from "../controllers/ai.controller";

const router = Router();

router.post('/chat', async (req, res) => new AiController(req, res).chat());

export default router;