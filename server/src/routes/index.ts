import { Router } from "express";
import { tseController } from "../controllers";

const router = Router();

router.post("/tse", tseController);

export default router;
