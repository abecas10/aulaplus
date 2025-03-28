import {Router} from "express";

import {listAllPosts, getPostByID, createPost, updatePost, deletePost} from "../controllers/post.controller.js";

import requireAuth from "../middlewares/requireAuth.js";

const router = Router();

router.use(requireAuth(false));

router.get("/", listAllPosts);

router.get("/:id", getPostByID);

router.post("/", createPost);

router.put("/:id", updatePost);

router.delete("/:id", deletePost);

export default router;