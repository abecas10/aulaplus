window.onload = async function () {
	const check = await fetch(`${window.location.origin}`);
	if (!check.ok) {
		window.location.replace(`https://abecas10.github.io/aulaplusdown/`);
	}
};


document.querySelector("#credits").addEventListener("click", () => {
	window.location.replace(`${window.location.origin}/credits`);
});

let username = localStorage.getItem("username");
if (!username) {
	username = "Login";
}
document.querySelector("#user_name").textContent = username;

document.querySelector("#user_name").addEventListener("click", () => {
	window.location.replace(`${window.location.origin}/me`);
});

document.querySelector(".Asignaturas").addEventListener("click", () => {
	window.location.replace(`${window.location.origin}/apuntes`);
});

document.querySelector(".Clases").addEventListener("click", () => {
	window.location.replace(`${window.location.origin}/clases`);
});

document.querySelector(".Agenda_Digital").addEventListener("click", () => {
	window.location.replace(`${window.location.origin}/agenda_digital`);
});

document.querySelector(".Opiniones").addEventListener("click", () => {
	window.location.replace(`${window.location.origin}/home`);
});

document.querySelector(".SuperUsers").addEventListener("click", () => {
	window.location.replace(`${window.location.origin}/superuser`);
});