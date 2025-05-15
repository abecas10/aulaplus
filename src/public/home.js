window.onload = async function () {
	const token = localStorage.getItem("token");

	const res = await fetch(`${window.location.origin}/user/validate`, {
		headers: {
			"Content-Type": "application/json",
			"Authorization": token
		}
	});
	if (!res.ok) location.replace(`${location.origin}`);

	const titleInput = document.querySelector("#title-input");
	const descriptionInput = document.querySelector("#description-input");

	const formElement = document.querySelector("#form");
	formElement.onsubmit = function (event) {
		// event.preventDefault();
		fetch(`${window.location.origin}/post`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": token
			},
			body: JSON.stringify({
				title: titleInput.value,
				description: descriptionInput.value
			})
		});
	};
};

document.querySelector("#back_home").addEventListener("click", () => {
	window.location.replace(`${location.origin}/aulaplus`);
});
document.addEventListener('DOMContentLoaded', function() {
	let nameElements = document.querySelectorAll('.username');

	nameElements.forEach(nameElement => {
		let name = nameElement.textContent.trim().toLowerCase();

		if (name === 'albecas100') {
			let superuserSpan = document.createElement('span');
			superuserSpan.textContent = ' (Propietario)';
			nameElement.appendChild(superuserSpan);
		}
		if (name === 'irene') {
			let superuserSpan = document.createElement('span');
			superuserSpan.textContent = ' (Propietaria)';
			nameElement.appendChild(superuserSpan);
		}
	});
});

document.addEventListener('DOMContentLoaded', function() {
	const createdAtElements = document.querySelectorAll('.created-at');

	createdAtElements.forEach(element => {
		const createdAtStr = element.dataset.createdAt;
		const createdAt = new Date(createdAtStr.replace(' ', 'T'));
		const now = new Date();
		const diffSeconds = Math.floor((now - createdAt) / 1000) - 3600 - 3600;

	if (diffSeconds < 60) {
		element.textContent = 'Hace unos segundos';
	} else if (diffSeconds < 3600) {
		const diffMinutes = Math.floor(diffSeconds / 60);
		element.textContent = `Hace ${diffMinutes} minutos`;
	} else if (diffSeconds < 86400) {
		const diffHours = Math.floor(diffSeconds / 3600);
		element.textContent = `Hace ${diffHours} horas`;
	} else if (diffSeconds < 604800) {
		const diffDays = Math.floor(diffSeconds / 86400);
		element.textContent = `Hace ${diffDays} días`;
	} else if (diffSeconds < 2419200) {
		const diffWeeks = Math.floor(diffSeconds / 604800);
		element.textContent = `Hace ${diffWeeks} semanas`;
	} else {
		const diffMonths = Math.floor(diffSeconds / 2592000);
		element.textContent = `Hace ${diffMonths} meses`;
	}
	});
});