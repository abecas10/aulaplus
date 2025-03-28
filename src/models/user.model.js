import db from "../database/database.js";

const UserModel = {
	getUserByUsername: username => {
		return new Promise((resolve, reject) => {
			db.get("SELECT username, created_at FROM users WHERE username = ?", [username], (error, row) => {
				if (error) {
					console.error(error);
					reject(error);
				}
				resolve(row);
			});
		});
	},

	loginUser: user => {
		return new Promise((resolve, reject) => {
			const {username, password} = user;
			db.get("SELECT username, created_at FROM users WHERE username = ? and password = ?", [username, password], (error, row) => {
				if (error) {
					console.error(error);
					reject(error);
				}
				resolve(row);
			});
		});
	},

	createUser: user => {
		return new Promise((resolve, reject) => {
			const {username, password, mail} = user;
			db.get("INSERT INTO users (username, password) VALUES (?, ?) RETURNING username, created_at", [username, password], (error, row) => {
				if (error) {
					console.error(error);
					reject(error);
				}
				resolve(row);
			});
			db.get("INSERT INTO mails (username, mail) VALUES (?, ?) RETURNING username, mail", [username, mail], (error, row) => {
				if (error) {
					console.error(error);
					reject(error);
				}
				resolve(row);
			});
		});
	},

	updatePassword: user => {
		return new Promise((resolve, reject) => {
			const {username, password} = user;
			db.get("UPDATE users SET password = ? WHERE username = ? RETURNING username, created_at", [password, username], (error, row) => {
				if (error) {
					console.error(error);
					reject(error);
				}
				resolve(row);
			});
		});
	},

	deleteUser: username => {
		return new Promise((resolve, reject) => {
			db.get("DELETE FROM mails WHERE username = ? RETURNING username, mail", [username], (error, row) => {
				if (error) {
					console.error(error);
					reject(error);
				}
				resolve(row);
			});
			db.get("DELETE FROM users WHERE username = ? RETURNING username, created_at", [username], (error, row) => {
				if (error) {
					console.error(error);
					reject(error);
				}
				resolve(row);
			});
		});
	},

	getEmail: username => {
		return new Promise((resolve, reject) => {
			db.get("SELECT mail FROM mails WHERE username = ?", [username], (error, row) => {
				if (error) {
					console.error(error);
					reject(error);
				} else {
					if (row && row.mail) {
					resolve(row.mail);
				} else {
					reject("Correo electrónico no encontrado para el usuario: " + username);
				}
			}
		});
	});
	}
};

export default UserModel;
