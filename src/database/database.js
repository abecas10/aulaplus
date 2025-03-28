import sqlite3 from "sqlite3";

sqlite3.verbose();

// const db = new sqlite3.Database(":memory:");
const db = new sqlite3.Database("./db/database.db");

db.serialize(() => {
	db.exec(`
		PRAGMA foreign_keys = ON;
		CREATE TABLE IF NOT EXISTS posts (
			id TEXT PRIMARY KEY,
			title TEXT,
			description TEXT,
			username TEXT REFERENCES users(username),
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP
		);
		CREATE TABLE IF NOT EXISTS users (
			username TEXT PRIMARY KEY,
			password TEXT,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP
		);
		CREATE TABLE IF NOT EXISTS materias (
			username TEXT REFERENCES users(username),
			sociales INTEGER,
			fisica_y_quimica INTEGER,
			ingles INTEGER,
			geologia_y_biologia INTEGER,
			frances INTEGER,
			catalan INTEGER,
			castellano INTEGER,
			musica INTEGER,
			matematicas INTEGER,
			informatica INTEGER,
			otros TEXT
		);
		CREATE TABLE IF NOT EXISTS mails (
			username TEXT REFERENCES users(username),
			mail TEXT
		);
		`);

	// Create
	// const [id, title, description, username] = ["djasduqwhu", "titulo 2", "descripcion 2", "usuario 2"];
	// db.run("INSERT INTO posts (id, title, description, username) VALUES (?, ?, ?, ?)", [id, title, description, username]);

	// Read
	// db.all("SELECT * FROM posts", (error, rows) => {
	// 	if (error) console.error(error);
	// 	console.log(rows);
	// });

	// Read One
	// db.get("SELECT * FROM posts WHERE id = ?", ["djasduqwhu"], (error, row) => {
	// 	if (error) console.error(error);
	// 	console.log(row);
	// });

	// Update
	// db.run("UPDATE posts SET title = ?, description = ?, username = ? WHERE id = ?", ["titulo 3", "descripcion 3", "usuario 3", "djasduqwhu"]);

	// Delete
	// db.run("DELETE FROM posts WHERE id = ?", ["djasduqwhu"]);

	// Statement y Prepare
	// const id1 = "1";
	// const title1 = "title 1";
	// const description1 = "description 1";
	// const username1 = "username 1";
	// const id2 = "2";
	// const title2 = "title 2";
	// const description2 = "description 2";
	// const username2 = "username 2";
	// const id3 = "3";
	// const title3 = "title 3";
	// const description3 = "description 3";
	// const username3 = "username 3";
	// const stmt = db.prepare("INSERT INTO posts (id, title, description, username) VALUES (?, ?, ?, ?)");
	// stmt.run([id1, title1, description1, username1]);
	// stmt.run([id2, title2, description2, username2]);
	// stmt.run([id3, title3, description3, username3]);
	// stmt.finalize();
});

export default db;
