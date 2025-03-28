import {Router} from "express";

import {getMateriasByUsername, createMateriasByUsername,updateMateriasByUsername, deleteMateriasByUsername} from "../controllers/materias.controller.js";

import requireAuth from "../middlewares/requireAuth.js";

const router = Router();

router.get("/materiasusr/:username", requireAuth(false), getMateriasByUsername);

router.post("/materiascreate", requireAuth(false), createMateriasByUsername);

router.post("/materiasupdate", requireAuth(false), updateMateriasByUsername);

router.delete("/materiasdelete", requireAuth(false), deleteMateriasByUsername);

export default router;