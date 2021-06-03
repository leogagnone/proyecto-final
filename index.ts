import Server from './class/server';
import mysql from 'mysql';

//Server web
const server = new Server();

server.start(()=>{
    console.log(`Server running on port ${server.puerto} on host ${server.host}`);
});

//Database connect
const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"gestion_inmobiliaria",
    port:3306

})

connection.connect((error)=>{
    if (error){
        throw error
    }
    else{
       console.log(`App connect to MySQL data base`) 
    }

});
