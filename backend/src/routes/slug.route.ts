import { Router } from "express";
import slugController from "../controller/slug.controller.js";

const router = Router();

router.post("/", slugController.createSlug);
router.get("/", slugController.getSlug);
router.put("/", slugController.editSlug);

export default router;
