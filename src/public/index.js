// Register Form
document.querySelector("#register").addEventListener("submit", async event => {
	event.preventDefault();
	const username = document.querySelector("#register-username").value;
	const password = document.querySelector("#register-password").value;
	const mail = document.querySelector("#register-mail").value;

	const res = await fetch(`${window.location.origin}/user/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			username,
			password,
			mail
		})
	});
	const data = await res.json();
	console.log(data);
	if (res.ok && data.token) {
		localStorage.setItem("token", data.token);
		localStorage.setItem("username", username);
		localStorage.setItem("mail", mail);
		if (username === "albecas100") {
			localStorage.setItem("superuser", "true");
		}
		if (username === "Irene") {
			localStorage.setItem("superuser", "true");
		}
		location.replace(`${location.origin}/aulaplus`);
	}
});

document.querySelector("#login").addEventListener("submit", async event => {
	event.preventDefault();
	const username = document.querySelector("#login-username").value;
	const password = document.querySelector("#login-password").value;

	const res = await fetch(`${window.location.origin}/user/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			username,
			password
		})
	});
	const data = await res.json();
	console.log(data);

	if (res.ok && data.token) {
		localStorage.setItem("token", data.token);
		localStorage.setItem("username", username);

		const res2 = await fetch(`${window.location.origin}/user/getmail`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username
			})
		});
		const data2 = await res2.json();
		console.log(data2);
		localStorage.setItem("mail", data2.user);

		if (username === "albecas100") {
			localStorage.setItem("superuser", "true");
		}
		if (username === "Irene") {
			localStorage.setItem("superuser", "true");
		}
		location.replace(`${location.origin}/aulaplus`);
	}
	else{
		alert("Error al iniciar sesión. Verifica tu usuario y contraseña.");
	}
});

function validarContraseña() {
	const contraseña = document.getElementById('password').value;
	const mensajeError = document.getElementById('mensajeError');

	if (contraseña.length < 8) {
	mensajeError.textContent = 'La contraseña debe tener al menos 8 caracteres.';
	} else {
	mensajeError.textContent = '';
	}
}

function validarContraseña2() {
	const contraseña = document.getElementById('register-password').value;
	const mensajeError = document.getElementById('mensajeError2');

	if (contraseña.length < 8) {
	mensajeError.textContent = 'La contraseña debe tener al menos 8 caracteres.';
	} else {
	mensajeError.textContent = '';
	}
}

// Alternar entre formularios de login y registro
document.addEventListener('DOMContentLoaded', function() {
    // Crear botón de toggle
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'toggle-form';
    toggleBtn.textContent = '¿No tienes cuenta? Regístrate aquí';
    document.body.appendChild(toggleBtn);
    
    // Funcionalidad toggle
    toggleBtn.addEventListener('click', function() {
        const loginForm = document.getElementById('login');
        const registerForm = document.getElementById('register');
        
        if (loginForm.style.display === 'none') {
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
            toggleBtn.textContent = '¿No tienes cuenta? Regístrate aquí';
        } else {
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
            toggleBtn.textContent = '¿Ya tienes cuenta? Inicia sesión aquí';
        }
    });
});