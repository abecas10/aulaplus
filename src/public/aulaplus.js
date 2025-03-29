document.querySelector("#logout").addEventListener("click", () => {
	localStorage.removeItem("token");
	localStorage.removeItem("superuser");
	localStorage.removeItem("username");
	localStorage.removeItem("mail");
	alert("Te has deslogueado correctamente");
	window.location.reload();
});

document.querySelector("#apuntes").addEventListener("click", () => {
	location.replace(`${window.location.origin}/apuntes`);
});