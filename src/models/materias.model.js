import db from "../database/database.js";

const MateriasModel = {
    getMateriasByUsername: username => {
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM materias WHERE username = ?", [username], (error, row) => {
                if (error) {
                    console.error(error);
                    reject(error);
                }
                resolve(row);
            });
        });
    },

    createMateriasByUsername: (username, sociales, fisica_y_quimica, ingles, geologia_y_biologia , frances, catalan, castellano, musica, matematicas, informatica, otros) => {
        return new Promise((resolve, reject) => {
            db.get("INSERT INTO materias (username, sociales, fisica_y_quimica, ingles, geologia_y_biologia, frances, catalan, castellano, musica, matematicas, informatica, otros) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING *", [username, sociales, fisica_y_quimica, ingles, geologia_y_biologia, frances, catalan, castellano, musica, matematicas, informatica, otros], (error, row) => {
                if (error) {
                    console.error(error);
                    reject(error);
                }
                resolve(row);
            });
        });
    },

    updateMateriasByUsername: (username, sociales, fisica_y_quimica, ingles, geologia_y_biologia, frances, catalan, castellano, musica, matematicas, informatica, otros = "nada") => {
        return new Promise((resolve, reject) => {
            db.get("UPDATE materias SET sociales = ?, fisica_y_quimica = ?, ingles = ?, geologia_y_biologia = ?, frances = ?, catalan = ?, castellano = ?, musica = ?, matematicas = ?, informatica = ?, otros = ? WHERE username = ? RETURNING *", [sociales, fisica_y_quimica, ingles, geologia_y_biologia, frances, catalan, castellano, musica, matematicas, informatica, otros, username], (error, row) => {
                if (error) {
                    console.error(error);
                    reject(error);
                }
                resolve(row);
            });
        });
    },

    deleteMateriasByUsername: username => {
        return new Promise((resolve, reject) => {
            db.get("DELETE FROM materias WHERE username = ? RETURNING *", [username], (error, row) => {
                if (error) {
                    console.error(error);
                    reject(error);
                }
                resolve(row);
            });
        });
    }
};

export default MateriasModel;