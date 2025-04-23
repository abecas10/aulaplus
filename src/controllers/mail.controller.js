import nodemailer from "nodemailer";

export async function mailchangepass1(req, res) {
	const {username, mail} = req.body;
	if (!username) return res.status(400).json({error: "missing username field"});
	if (!mail) return res.status(400).json({error: "missing mail field"});

	try {
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
            subject: 'Cambiar contraseña en Aula +',
            text: `Hola ${username}, Has solicitado un cambio de contraseña en Aula +\nEsta funcion esta actualmente en desarrollo.\n\nSimplemente entra al (link)/changepassword para cambiar tu contraseña.\n\nSi tienes alguna duda, no dudes en ponerte en contacto con nosotros.\n\nSaludos,\nAula +\n\n\n---------------------\n©2025-2026 Aula +\nContenido exclusivo de Aula +\n©Todos los derechos reservados\nContacto: contacto.aula.plus@gmail.com\nFundadores y Propietarios: Àlex Castellà & Irene Loewe & Gabriel Cereto\nAula +, Learn Smarter, Not harder.\n---------------------`,
		};
		
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
			console.log(error);
			} else {
			console.log('Correo electrónico enviado: ' + mail + info.response);
			}
		});
	}
    catch (error) {
        console.log(error);
        return res.status(400).json({error: "failed to send the email"});
    }
}


export async function deleteUserMail(req, res) {
	const {username, mail} = req.body;
	if (!username) return res.status(400).json({error: "missing username field"});
	if (!mail) return res.status(400).json({error: "missing mail field"});

	try {
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
            subject: 'Eliminar cuenta en Aula +',
            text: `Hola ${username}, Has solicitado eliminar tu cuenta en Aula +\nDeves dirigirte a este link: (link original)/deleteaccount.\n\nSi tienes alguna duda, no dudes en ponerte en contacto con nosotros.\n\nSaludos,\nAula +\n\n\n---------------------\n©2025-2026 Aula +\nContenido exclusivo de Aula +\n©Todos los derechos reservados\nContacto: contacto.aula.plus@gmail.com\nFundadores y Propietarios: Àlex Castellà & Irene Loewe & Gabriel Cereto\nAula +, Learn Smarter, Not harder.\n---------------------`,
        };
        
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
            console.log(error);
            } else {
            console.log('Correo electrónico enviado: ' + mail + info.response);
            }
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({error: "failed to send the email"});
    }
};

export async function mailchangemail(req, res) {
	const {username, mail} = req.body;
	if (!username) return res.status(400).json({error: "missing username field"});
	if (!mail) return res.status(400).json({error: "missing mail field"});

	try {
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
            subject: 'Cambio de correo electrónico en Aula +',
            text: `Hola ${username}, Has cambiado tu correo electrónico en Aula +\nTu correo electrónico es ${mail}.\n\n¡No olvides echarle un vistazo a todos los servicios que ofrecemos!\n\nSi tienes alguna duda, no dudes en ponerte en contacto con nosotros.\n\nSaludos,\nAula +\n\n\n---------------------\n©2025-2026 Aula +\nContenido exclusivo de Aula +\n©Todos los derechos reservados\nContacto: contacto.aula.plus@gmail.com\nFundadores y Propietarios: Àlex Castellà & Irene Loewe & Gabriel Cereto\nAula +, Learn Smarter, Not harder.\n---------------------`,
		};

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
            console.log(error);
            } else {
            console.log('Correo electrónico enviado: ' + mail + info.response);
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({error: "failed to send the email"});
    }
};
