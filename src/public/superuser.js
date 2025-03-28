window.onload = async function () {
    const token = localStorage.getItem("token");
    const superuser = localStorage.getItem("superuser");

    if (!token) {
        alert("Alomejor eres superusuario, pero deves iniciar sesion para poder acceder a esta pagina");
        location.replace(location.origin);
        return;
    }
    if (superuser !== "true") {
        alert("No eres superusuario, no puedes acceder a esta pagina");
        location.replace(`${location.origin}/aulaplus`);
        return;
    }

    try {
        const res = await fetch(`${window.location.origin}/user/validate`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
            },
        });

        if (!res.ok) {
            location.replace(location.origin);
        }
    } catch (error) {
        console.error("Error al validar el token:", error);
        location.replace(location.origin);
    }
};


function scrollToElement(id) {
    const element = document.getElementById(id);
    if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    }
}

document.querySelector("#submit_button1").addEventListener("click", async () => {
    const token = localStorage.getItem("token");
    const username = document.querySelector("#username_input").value;
    const sociales = parseInt(document.querySelector("#sociales_input").value);
    const fisica_y_quimica = parseInt(document.querySelector("#fisica_y_quimica_input").value);
    const ingles = parseInt(document.querySelector("#ingles_input").value);
    const geologia_y_biologia = parseInt(document.querySelector("#geologia_y_biologia_input").value);
    const frances = parseInt(document.querySelector("#frances_input").value);
    const catalan = parseInt(document.querySelector("#catalan_input").value);
    const castellano = parseInt(document.querySelector("#castellano_input").value);
    const musica = parseInt(document.querySelector("#musica_input").value);
    const matematicas = parseInt(document.querySelector("#matematicas_input").value);
    const informatica = parseInt(document.querySelector("#informatica_input").value);
    const otros = document.querySelector("#otros_input").value;

    console.log(username, sociales, fisica_y_quimica, ingles, geologia_y_biologia, frances, catalan, castellano, musica, matematicas, informatica, otros);

    const res = await fetch(`${window.location.origin}/materias/materiascreate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
		body: JSON.stringify({
			username,
            sociales,
            fisica_y_quimica,
            ingles,
            geologia_y_biologia,
            frances,
            catalan,
            castellano,
            musica,
            matematicas,
            informatica,
            otros
		})
    });
	const data = await res.json();
	let contenidoHTML = "";
    for (const clave in data.resultMaterias) {
        contenidoHTML += `<p>${clave}: ${data.resultMaterias[clave]}</p>`;
    }
    document.getElementById("resultado").innerHTML += `<h1>Resultado</h1>`;
    document.getElementById("resultado").innerHTML += contenidoHTML;
    scrollToElement("resultado");
});

document.querySelector("#submit_button2").addEventListener("click", async () => {
    const token = localStorage.getItem("token");
    const username = document.querySelector("#username_input").value;
    const sociales = parseInt(document.querySelector("#sociales_input").value);
    const fisica_y_quimica = parseInt(document.querySelector("#fisica_y_quimica_input").value);
    const ingles = parseInt(document.querySelector("#ingles_input").value);
    const geologia_y_biologia = parseInt(document.querySelector("#geologia_y_biologia_input").value);
    const frances = parseInt(document.querySelector("#frances_input").value);
    const catalan = parseInt(document.querySelector("#catalan_input").value);
    const castellano = parseInt(document.querySelector("#castellano_input").value);
    const musica = parseInt(document.querySelector("#musica_input").value);
    const matematicas = parseInt(document.querySelector("#matematicas_input").value);
    const informatica = parseInt(document.querySelector("#informatica_input").value);
    const otros = document.querySelector("#otros_input").value;

    console.log(username, sociales, fisica_y_quimica, ingles, geologia_y_biologia, frances, catalan, castellano, musica, matematicas, informatica, otros);

    const res = await fetch(`${window.location.origin}/materias/materiasupdate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
		body: JSON.stringify({
			username,
            sociales,
            fisica_y_quimica,
            ingles,
            geologia_y_biologia,
            frances,
            catalan,
            castellano,
            musica,
            matematicas,
            informatica,
            otros
		})
    });
	const data = await res.json();
	let contenidoHTML = "";
    for (const clave in data.resultMaterias) {
        contenidoHTML += `<p>${clave}: ${data.resultMaterias[clave]}</p>`;
    }
    document.getElementById("resultado").innerHTML += `<h1>Resultado</h1>`;
    document.getElementById("resultado").innerHTML += contenidoHTML;
    scrollToElement("resultado");
});

document.querySelector("#get_button").addEventListener("click", async () => {
    const token = localStorage.getItem("token");
    const username = document.querySelector("#username_get").value;

    console.log(username);

    const res = await fetch(`${window.location.origin}/materias/materiasusr/${username}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
    });
	const data = await res.json();
	let contenidoHTML = "";
    for (const clave in data.materias) {
        contenidoHTML += `<p>${clave}: ${data.materias[clave]}</p>`;
    }
    document.getElementById("resultado").innerHTML += `<h1>Resultado</h1>`;
    document.getElementById("resultado").innerHTML += contenidoHTML;
    scrollToElement("resultado");
});

document.querySelector("#delete_button").addEventListener("click", async () => {
    const token = localStorage.getItem("token");
    const username = document.querySelector("#username_delete").value;

    console.log(username);

    const res = await fetch(`${window.location.origin}/materias/materiasdelete`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
		body: JSON.stringify({
			username
		})
    });
	const data = await res.json();
	let contenidoHTML = "";
    for (const clave in data.resultMaterias) {
        contenidoHTML += `<p>${clave}: ${data.resultMaterias[clave]}</p>`;
    }
    document.getElementById("resultado").innerHTML += `<h1>Resultado (User deleted)</h1>`;
    document.getElementById("resultado").innerHTML += contenidoHTML;
    scrollToElement("resultado");
});

document.querySelectorAll("#delete_post_button").forEach(element => {
    element.addEventListener("click", async event => {
        const token = localStorage.getItem("token");
        const superuser = localStorage.getItem("superuser");
        const id = document.querySelector("#id_delete").value;
        if (superuser !== "true") {
            alert("No tienes permisos para borrar este post");
            return;
        }
        await fetch(`${window.location.origin}/post/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            method: "DELETE"
        });
        alert("Post borrado");
        location.replace(`${window.location.origin}/home`);
    });
});