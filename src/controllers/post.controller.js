import {v4 as uuid} from "uuid";
import PostModel from "../models/post.model.js";

export async function listAllPosts(req, res) {
	try {
		const posts = await PostModel.getAllPosts();
		if (!posts) return res.json({posts: []});
		return res.json({posts});
	} catch {
		return res.json({posts: []});
	}
}

export async function getPostByID(req, res) {
	try {
		const post = await PostModel.getPostByID(req.params.id);
		if (!post) return res.status(404).json({error: "post doesn't exist"});
		return res.json({post});
	} catch (error) {
		return res.status(404).json({error: "post doesn't exist"});
	}
}

export async function createPost(req, res) {
	const username = req.username;
	const {title, description} = req.body;
	const id = uuid();
	
	if (!username) return res.status(400).json({error: "request is not authorized"});
	if (!title) return res.status(400).json({error: "missing title field"});
	if (!description) return res.status(400).json({error: "missing description field"});

	const post = {title, description, username, id};

	try {
		const resultPost = await PostModel.createPost(post);
		if (!resultPost) return res.status(400).json({error: "failed to create the post"});
		return res.json({resultPost});
	} catch (error) {
		return res.status(400).json({error: "failed to create the post"});
	}
}

export async function updatePost(req, res) {
	const id = req.params.id;
	const username = req.username;
	const {title, description} = req.body;

	if (!username) return res.status(400).json({error: "request is not authorized"});
	if (!title) return res.status(400).json({error: "missing title field"});
	if (!description) return res.status(400).json({error: "missing description field"});

	const post = {title, description, username};

	try {
		const resultPost = await PostModel.updatePost(id, post);
		if (!resultPost) return res.status(400).json({error: "failed to update the post"});
		return res.json({resultPost});
	} catch (error) {
		return res.status(400).json({error: "failed to update the post"});
	}
}

export async function deletePost(req, res) {
	try {
		const resultPost = await PostModel.deletePost(req.params.id);
		if (!resultPost) return res.status(404).json({error: "post doesn't exist"});
		return res.json({resultPost});
	} catch (error) {
		return res.status(404).json({error: "post doesn't exist"});
	}
}
