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