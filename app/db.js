
import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '1234', 
    database: 'bd_Katicell_online' 
});

connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conexión a la base de datos establecida');
});

export default connection;






