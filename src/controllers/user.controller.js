import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export async function validate(req, res) {
	if (!req.username) return res.status(401).json({error: "request is not authorized"});
	return res.status(200).json({message: "ok"});
}

export async function login(req, res) {
	const {username, password} = req.body;

	try {
		const user = await UserModel.loginUser({username, password});
		if (!user) return res.status(400).json({error: "login failed"});

		const token = jwt.sign({username}, process.env["JWT_SECRET"], {expiresIn: "7d"});

		return res.json({user, token});
	} catch (error) {
		return res.status(400).json({error: "login failed"});
	}
}

export async function register(req, res) {
	const {username, password, mail} = req.body;

	if (!username) return res.status(400).json({error: "missing username field"});
	if (!password) return res.status(400).json({error: "missing password field"});
	if (!mail) return res.status(400).json({error: "missing mail field"});
	if (password.length < 8) return res.status(400).json({error: "the password is too short"});

	const user = {username, password, mail};

	try {
		const resultUser = await UserModel.createUser(user);
		if (!resultUser) return res.status(400).json({error: "failed to create the user or the username already exists"});

		const token = jwt.sign({username}, process.env["JWT_SECRET"], {expiresIn: "7d"});

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
			user: 'contacto.aula.plus@gmail.com',
			pass: 'lgcwyliqwisyhjaw'
			}
		});
		
		const mailOptions = {
			from: 'contacto.aula.pus@gmail.com',
			to: mail,
			subject: '¡Bienvenido a Aula +!',
			text: `Hola ${username}, ¡bienvenido a Aula +!\nMuchas gracias por registrarte.\n\n¡No olvides echarle un vistazo a todos los servicios que ofrecemos!\n\nSi tienes alguna duda, no dudes en ponerte en contacto con nosotros.\n\nSaludos,\nAula +\n\n\n---------------------\n©2025-2026 Aula +\nContenido exclusivo de Aula +\n©Todos los derechos reservados\nContacto: contacto.aula.plus@gmail.com\nFundadores y Propietarios: Àlex Castellà & Irene Loewe & Gabriel Cereto\nAula +, Learn Smarter, Not harder.\n---------------------`,
		};
		
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
			console.log(error);
			} else {
			console.log('Correo electrónico enviado: ' + mail + info.response);
			}
		});

		return res.json({resultUser, token});
	} catch (error) {
		console.log(error);
		return res.status(400).json({error: "failed to create the user"});
	}
}

export async function deleteUser(req, res) {
	const {username} = req.body;

	if (!username) return res.status(400).json({error: "missing username field"});

	try {
		const resultUser = await UserModel.deleteUser(username);
		if (!resultUser) return res.status(400).json({error: "failed to delete the user"});

		return res.json({resultUser});
	} catch (error) {
		return res.status(400).json({error: "failed to delete the user"});
	}
}

export async function changePassword(req, res) {
	const {username, password, mail} = req.body;

	if (!username) return res.status(400).json({error: "missing username field"});
	if (!password) return res.status(400).json({error: "missing password field"});
	if (password.length < 8) return res.status(400).json({error: "the password is too short"});

	try {
		const user = {username, password};
		const resultUser = await UserModel.updatePassword(user);
		if (!resultUser) return res.status(400).json({error: "failed to change the password"});

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
			user: 'contacto.aula.plus@gmail.com',
			pass: 'lgcwyliqwisyhjaw'
			}
		});
		
		const mailOptions = {
			from: 'contacto.aula.pus@gmail.com',
			to: mail,
			subject: 'Cambio de contraseña en Aula +',
			text: `Hola ${username}, Has cambiado tu contraseña en Aula +\nTu nueva contraseña es ${password}.\n\nRecuerda no compartir tu contraseña con nadie.\n\n¡No olvides echarle un vistazo a todos los servicios que ofrecemos!\n\nSi tienes alguna duda, no dudes en ponerte en contacto con nosotros.\n\nSaludos,\nAula +\n\n\n---------------------\n©2025-2026 Aula +\nContenido exclusivo de Aula +\n©Todos los derechos reservados\nContacto: contacto.aula.plus@gmail.com\nFundadores y Propietarios: Àlex Castellà & Irene Loewe & Gabriel Cereto\nAula +, Because Studying Shouldn’t Be a Struggle.\n---------------------`,
		};
		
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
			console.log(error);
			} else {
			console.log('Correo electrónico enviado: ' + mail + info.response);
			}
		});

		return res.json({resultUser});
	} catch (error) {
		console.log(error);
		return res.status(400).json({error: "failed to change the password"});
	}
}

export async function getEmail(req, res) {
	const {username} = req.body;

	if (!username) return res.status(400).json({error: "missing username field"});

	try {
		const user = await UserModel.getEmail(username);
		if (!user) return res.status(400).json({error: "failed to get the email"});

		return res.json({user});
	} catch (error) {
		return res.status(400).json({error: "failed to get the email"});
	}
}

export async function changeEmail(req, res) {
	const {username, mail} = req.body;

	if (!username) return res.status(400).json({error: "missing username field"});
	if (!mail) return res.status(400).json({error: "missing mail field"});

	const user = {username, mail};

	try {
		const resuser = await UserModel.changeEmail({user});
		if (!resuser) return res.status(400).json({error: "failed to change the email"});

		return res.json({resuser});
	} catch (error) {
		return res.status(400).json({error: "failed to change the email"});
	}
}

// export async function updatePost(req, res) {
// 	const id = req.params.id;
// 	const {title, description, username} = req.body;

// 	if (!title) return res.status(400).json({error: "missing title field"});
// 	if (!description) return res.status(400).json({error: "missing description field"});
// 	if (!username) return res.status(400).json({error: "missing username field"});

// 	const post = {title, description, username};

// 	try {
// 		const resultPost = await PostModel.updatePost(id, post);
// 		if (!resultPost) return res.status(400).json({error: "failed to update the post"});
// 		return res.json({resultPost});
// 	} catch (error) {
// 		return res.status(400).json({error: "failed to update the post"});
// 	}
// };

// export async function deletePost(req, res) {
// 	try {
// 		const resultPost = await PostModel.deletePost(req.params.id);
// 		if (!resultPost) return res.status(404).json({error: "post doesn't exist"});
// 		return res.json({resultPost});
// 	}
// 	catch (error) {
// 		return res.status(404).json({error: "post doesn't exist"});
// 	}
// };
