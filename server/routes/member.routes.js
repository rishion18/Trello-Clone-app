import { Router } from "express";
import { memberLogin, memberRegister } from "../controllers/memberLogin.controller.js";

const router = Router();

router.post('/register' , memberRegister);
router.post('/login' , memberLogin);

export default router;