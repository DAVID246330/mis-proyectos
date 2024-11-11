import bcryptjs from "bcryptjs";
import connection from "../db.js"; 

// Lógica de registro
async function register(req, res) {
    const { user, email, password } = req.body;

    if (!user || !email || !password) {
        return res.status(400).json({ status: "error", message: "Todos los campos son requeridos." });
    }

    try {
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        connection.query(
            'INSERT INTO Usuario (Nombre, Correo_Electronico, Contraseña) VALUES (?, ?, ?)',
            [user, email, hashedPassword],
            (error, results) => {
                if (error) {
                    return res.status(500).json({ status: "error", message: "Error al registrar el usuario." });
                }
                res.status(200).json({ status: "OK", message: "Usuario registrado con éxito." });
            }
        );
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error en el servidor." });
    }
}

// Nueva función para inicio de sesión
async function login(req, res) {
    const { user, password } = req.body;

    if (!user || !password) {
        return res.status(400).json({ status: "error", message: "Los campos están incompletos" });
    }

    connection.query(
        'SELECT * FROM Usuario WHERE Nombre = ?',
        [user],
        async (error, results) => {
            if (error) throw error;

            if (results.length === 0) {
                return res.status(400).json({ status: "error", message: "Usuario no encontrado" });
            }

            const userData = results[0];
            const isMatch = await bcryptjs.compare(password, userData.Contraseña);
            if (!isMatch) {
                return res.status(400).json({ status: "error", message: "Contraseña incorrecta" });
            }

            res.status(200).json({ status: "OK", message: "Inicio de sesión exitoso" });
        }
    );
}

// Función para agregar un producto
async function addProduct(req, res) {
    const { Nombre, Descripcion, Precio, Precio_Descuento, Stock } = req.body;

    if (!Nombre || !Descripcion || !Precio || !Precio_Descuento || !Stock) {
        return res.status(400).json({ status: "error", message: "Todos los campos son requeridos." });
    }

    connection.query(
        'INSERT INTO Producto (Nombre, Descripcion, Precio, Precio_Descuento, Stock) VALUES (?, ?, ?, ?, ?)', // Agregados los placeholders
        [Nombre, Descripcion, Precio, Precio_Descuento, Stock], // Ahora pasamos los cinco valores
        (error, results) => {
            if (error) {
                return res.status(500).json({ status: "error", message: "Error al agregar el producto." });
            }
            res.status(201).json({ status: "OK", message: "Producto agregado con éxito.", id: results.insertId });
        }
    );
}

export const methods = {
    register,
    login,
    addProduct
};

