import MateriasModel from "../models/materias.model.js";

export async function getMateriasByUsername(req, res) {
	try {
		const materias = await MateriasModel.getMateriasByUsername(req.params.username);
		if (!materias) return res.json({materias: []});
		return res.json({materias});
	} catch {
		return res.json({materias: []});
	}
}

export async function createMateriasByUsername(req, res) {
	const {username, sociales, fisica_y_quimica, ingles, geologia_y_biologia, frances, catalan, castellano, musica, matematicas, informatica, otros} = req.body;

	if (!username) return res.status(400).json({error: "Missing username field"});
	const sociales2 = sociales || 1;
	const fisica_y_quimica2 = fisica_y_quimica || 1;
	const ingles2 = ingles || 1;
	const geologia_y_biologia2 = geologia_y_biologia || 1;
	const frances2 = frances || 1;
	const catalan2 = catalan || 1;
	const castellano2 = castellano || 1;
	const musica2 = musica || 1;
	const matematicas2 = matematicas || 1;
	const informatica2 = informatica || 1;
	const otros2 = otros || "nada";

	try {
		const resultMaterias = await MateriasModel.createMateriasByUsername(username, sociales2, fisica_y_quimica2, ingles2, geologia_y_biologia2, frances2, catalan2, castellano2, musica2, matematicas2, informatica2, otros2);
		if (!resultMaterias) return res.status(400).json({error: "failed to create the materias"});
		return res.json({resultMaterias});
	} catch (error) {
		return res.status(400).json({error: "failed to create the materias"});
	}
}

export async function updateMateriasByUsername(req, res) {
	const {username, sociales, fisica_y_quimica, ingles, geologia_y_biologia, frances, catalan, castellano, musica, matematicas, informatica, otros} = req.body;

	if (!username) return res.status(400).json({error: "Missing username field"});
	const sociales2 = sociales || 1;
	const fisica_y_quimica2 = fisica_y_quimica || 1;
	const ingles2 = ingles || 1;
	const geologia_y_biologia2 = geologia_y_biologia || 1;
	const frances2 = frances || 1;
	const catalan2 = catalan || 1;
	const castellano2 = castellano || 1;
	const musica2 = musica || 1;
	const matematicas2 = matematicas || 1;
	const informatica2 = informatica || 1;
	const otros2 = otros || "nada";

	try {
		const resultMaterias = await MateriasModel.updateMateriasByUsername(username, sociales2, fisica_y_quimica2, ingles2, geologia_y_biologia2, frances2, catalan2, castellano2, musica2, matematicas2, informatica2, otros2);
		if (!resultMaterias) return res.status(400).json({error: "failed to update the materias"});
		return res.json({resultMaterias});
	} catch (error) {
		return res.status(400).json({error: "failed to update the materias"});
	}
}

export async function deleteMateriasByUsername(req, res) {
	try {
		const username = req.body.username;
		if (!username) return res.status(400).json({error: "missing username field"});
		console.log(username);
		const resultMaterias = await MateriasModel.deleteMateriasByUsername(username);
		if (!resultMaterias) return res.status(404).json({error: "materias doesn't exist"});
		return res.json({resultMaterias});
	} catch (error) {
		return res.status(404).json({error: "materias doesn't exist 2"});
	}
}