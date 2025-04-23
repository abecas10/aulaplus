import {Router} from "express";
import PostModel from "../models/post.model.js";
import requireAuth from "../middlewares/requireAuth.js";

const router = Router();

router.get("/", async (req, res) => {
	res.render("index");
});

router.get("/home", async (req, res) => {
	const posts = await PostModel.getAllPosts();
	res.render("home", {posts});
});

router.get("/aulaplus", async (req, res) => {
	res.render("aulaplus");
});

router.get("/apuntes", async (req, res) => {
	res.render("apuntes");
});

router.get("/esquemas", async (req, res) => {
	res.render("esquemas");
});

router.get("/superuser", async (req, res) => {
	res.render("superuser");
});

router.get("/me", async (req, res) => {
	res.render("me");
});

router.get("/changepassword", async (req, res) => {
	res.render("changepassword");
});

router.get("/deleteaccount", async (req, res) => {
	res.render("deleteaccount");
});

router.get("/serverdown", async (req, res) => {
	res.render("serverdown");
});

router.get("/credits", async (req, res) => {
	res.render("credits");
});

export default router;