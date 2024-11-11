/*import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import connection from "./db.js"; 
import { methods as authentication } from "./controllers/authentication.controller.js"; 

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.set("port", 4000);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/admin", (req, res) => res.sendFile(path.join(__dirname, "pages/admin.html")));
app.get("/agregar-prod", (req, res) => res.sendFile(path.join(__dirname, "pages/agregar-prod.html")));
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "pages/login.html")));
app.get("/register", (req, res) => res.sendFile(path.join(__dirname, "pages/register.html")));
app.get("/home", (req, res) => res.sendFile(path.join(__dirname, "pages/home/home.html")));
app.get("/carrito", (req, res) => res.sendFile(path.join(__dirname, "pages/carrito.html")));
app.get("/pago", (req, res) => res.sendFile(path.join(__dirname, "pages/pago.html")));

// Rutas de autenticación
app.post("/api/register", authentication.register);
app.post("/api/login", authentication.login);

// Ruta para agregar producto
app.post("/api/add-product", authentication.addProduct);

app.listen(app.get("port"), () => {
    console.log("Servidor corriendo en puerto", app.get("port"));
});*/

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import connection from "./db.js"; 
import { methods as authentication } from "./controllers/authentication.controller.js"; 

// Configuración de constantes
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 4000;  // Permite configuración dinámica del puerto
const app = express();

// Middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Rutas para servir archivos HTML
const pagesPath = path.join(__dirname, "pages");
app.get("/admin", (req, res) => res.sendFile(path.join(pagesPath, "admin.html")));
app.get("/agregar-prod", (req, res) => res.sendFile(path.join(pagesPath, "agregar-prod.html")));
app.get("/", (req, res) => res.sendFile(path.join(pagesPath, "login.html")));
app.get("/register", (req, res) => res.sendFile(path.join(pagesPath, "register.html")));
app.get("/home", (req, res) => res.sendFile(path.join(pagesPath, "home/home.html")));
app.get("/carrito", (req, res) => res.sendFile(path.join(pagesPath, "carrito.html")));
app.get("/pago", (req, res) => res.sendFile(path.join(pagesPath, "pago.html")));

// Rutas de API para autenticación y productos
app.post("/api/register", authentication.register);
app.post("/api/login", authentication.login);
app.post("/api/add-product", authentication.addProduct);



// Iniciar el servidor en 0.0.0.0 para aceptar conexiones desde la red local
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
