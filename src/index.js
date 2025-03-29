import express from "express";
import morgan from "morgan";
import path from "path";
import {fileURLToPath} from "url";
import ejs from "ejs";

import postRoutes from "./routes/post.routes.js";
import userRoutes from "./routes/user.routes.js";
import viewRoutes from "./routes/view.routes.js";
import materiasRoutes from "./routes/materias.routes.js";
import mailRoutes from "./routes/mail.routes.js";

// MVC
// Modelo Vista Controlador
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const PORT = 80;

const app = express();

app.use(express.json());
app.use(morgan("combined"));
app.use(express.static(path.join(dirname, "./public")));

app.set("view engine", "ejs");
app.set("views", path.join(dirname, "./views"));

app.use("/", viewRoutes);
app.use("/post", postRoutes);
app.use("/user", userRoutes);
app.use("/materias", materiasRoutes);
app.use("/mail", mailRoutes);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
