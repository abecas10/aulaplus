window.onload = async function () {
    const token = localStorage.getItem("token");

    if (!token) {
        // No hay token, redirigir inmediatamente
        location.replace(location.origin);
        return; // Detener la ejecución del resto del código
    }

    try {
        const res = await fetch(`${window.location.origin}/user/validate`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
            },
        });

        if (!res.ok) {
            // Token inválido, redirigir
            location.replace(location.origin);
        }
        // Si res.ok, el token es válido, y la página continua cargando
    } catch (error) {
        console.error("Error al validar el token:", error);
        // Manejar el error, por ejemplo, redirigir o mostrar un mensaje
        location.replace(location.origin);
    }
};

const username = localStorage.getItem("username");
document.querySelector("#username").textContent = username;

const mail = localStorage.getItem("mail");
document.querySelector("#mail").textContent = mail;
const token = localStorage.getItem("token");

document.querySelector("#change-password").addEventListener("click", async () => {
    if (confirm("¿Estás seguro de que deseas cambiar tu contraseña?")) {
        alert("Revisa tu correo electrónico para cambiar la contraseña.");
        const res = await fetch(`${window.location.origin}/mail/mailchangepass1`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
            },
            body: JSON.stringify({
                username,
                mail
            }),
        });
    }
    else {
        alert("No has cambiado la contraseña.");
    }
});

document.querySelector("#delete-account").addEventListener("click", async () => {
    if (confirm("¿Estás seguro de que deseas eliminar tu cuenta?")) {
        alert("Revisa tu correo electrónico para eliminar tu cuenta.");
        const res = await fetch(`${window.location.origin}/mail/deleteusermail`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
            },
            body: JSON.stringify({
                username,
                mail
            }),
        });
    }
    else {
        alert("No has eliminado tu cuenta.");
    }
});

document.querySelector("#change-email").addEventListener("click", async () => {
    if (confirm("¿Estás seguro de que deseas cambiar tu correo electrónico?")) {
        const mail = prompt("Introduce tu nuevo correo electrónico:");
        if (!mail) {
            alert("No has introducido un correo electrónico.");
            location.replace(`${window.location.origin}/me`);
        }
        const res = await fetch(`${window.location.origin}/user/changeemail`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
            },
            body: JSON.stringify({
                username,
                mail
            }),
        });
        if (res.ok) {
            alert("Correo electrónico cambiado con éxito.");
            const res2 = await fetch(`${window.location.origin}/mail/mailchangemail`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token,
                },
                body: JSON.stringify({
                    username,
                    mail
                }),
            });
        }
        else {
            alert("No se ha podido cambiar el correo electrónico.");
        }
    }
    else {
        alert("No has cambiado tu correo electrónico.");
    }
});

document.querySelector("#back-button").addEventListener("click", async () => {
    location.replace(`${window.location.origin}/aulaplus`);
})

document.querySelector("#logout").addEventListener("click", async () => {
    if (confirm("¿Estás seguro de que deseas cerrar sesión?")) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("mail");
        localStorage.removeItem("superuser");
        location.replace(`${window.location.origin}`);
    }
    else {
        alert("No has cerrado sesión.");
    }
});