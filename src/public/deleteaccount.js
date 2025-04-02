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

document.querySelector("#delete-account").addEventListener("click", async () => {
    if (confirm("¿Estás seguro de que deseas eliminar tu cuenta?")) {
        const res = await fetch(`${window.location.origin}/user/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
            },
            body: JSON.stringify({
                username
            }),
        });
        if (res.ok) {
            alert("Cuenta eliminada con éxito.");
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.removeItem("mail");
            localStorage.removeItem("superuser");
            location.replace(`${window.location.origin}/aulaplus`);
        }
        else {
            alert("No se ha podido eliminar la cuenta.");
        }
    }
    else {
        alert("No has eliminado tu cuenta.");
    }
});