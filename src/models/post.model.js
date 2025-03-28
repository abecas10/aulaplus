import db from "../database/database.js";

const PostModel = {
	getAllPosts: () => {
		return new Promise((resolve, reject) => {
			db.all("SELECT * FROM posts", (error, rows) => {
				if (error) {
					console.error(error);
					reject(error);
				}
				resolve(rows);
			});
		});
	},

	getPostByID: id => {
		return new Promise((resolve, reject) => {
			db.get("SELECT * FROM posts WHERE id = ?", [id], (error, row) => {
				if (error) {
					console.error(error);
					reject(error);
				}
				resolve(row);
			});
		});
	},

	createPost: post => {
		return new Promise((resolve, reject) => {
			const {id, title, description, username} = post;
			db.get("INSERT INTO posts (id, title, description, username) VALUES (?, ?, ?, ?) RETURNING *", [id, title, description, username], (error, row) => {
				if (error) {
					console.error(error);
					reject(error);
				}
				resolve(row);
			});
		});
	},

	updatePost: (id, post) => {
		return new Promise((resolve, reject) => {
			const {title, description, username} = post;
			db.get("UPDATE posts SET title = ?, description = ?, username = ? WHERE id = ? RETURNING *", [title, description, username, id], (error, row) => {
				if (error) {
					console.error(error);
					reject(error);
				}
				resolve(row);
			});
		});
	},

	deletePost: id => {
		return new Promise((resolve, reject) => {
			db.get("DELETE FROM posts WHERE id = ? RETURNING *", [id], (error, row) => {
				if (error) {
					console.error(error);
					reject(error);
				}
				resolve(row);
			});
		});
	}
};

export default PostModel;
