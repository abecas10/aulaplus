import {Router} from "express";

import {login, register, validate, deleteUser, changePassword, getEmail} from "../controllers/user.controller.js";
import requireAuth from "../middlewares/requireAuth.js";

const router = Router();

router.get("/validate", requireAuth(false), validate);

router.post("/login", login);

router.post("/register", register);

router.delete("/delete", requireAuth(true), deleteUser);

router.post("/change-password", requireAuth(true), changePassword);

router.post("/getmail", getEmail);

// router.put("/:id", updatePost);

// router.delete("/:id", deletePost);

export default router;
