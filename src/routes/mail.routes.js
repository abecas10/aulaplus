import {Router} from "express";

import {mailchangepass1, deleteUserMail, mailchangemail} from "../controllers/mail.controller.js";

import requireAuth from "../middlewares/requireAuth.js";

const router = Router();

router.post("/mailchangepass1", requireAuth(false), mailchangepass1);

router.post("/deleteusermail", requireAuth(false), deleteUserMail);

router.post("/mailchangemail", requireAuth(false), mailchangemail);

export default router;