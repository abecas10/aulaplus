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
const token = localStorage.getItem("token");

document.querySelector("#change-password").addEventListener("click", async () => {
    const password = prompt("Introduce tu nueva contraseña:");
    console.log(password);
    if (!password) {
        alert("No has introducido una contraseña.");
        location.replace(`${window.location.origin}/me`);
    }
    else {
        const res = await fetch(`${window.location.origin}/user/change-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
            },
            body: JSON.stringify({
                username,
                password,
                mail
            }),
        });
        
        if (!res.ok) {
            alert("Error al cambiar la contraseña o la contraseña es menor de 8 caracteres.");
            alert("contacta a un administrador");
            console.log(res);
        }
        else{
            alert("Contraseña cambiada con éxito.");
            location.replace(`${window.location.origin}/me`);
        }
    }
    
});

