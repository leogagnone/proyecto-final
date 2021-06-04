import mysql from 'mysql';


const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "gestion_inmobiliaria",
    database: ,
    port: 3306
})

export default connection;
