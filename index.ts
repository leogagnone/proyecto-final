import Server from './class/server';
import connection from './bin/connectmysql';
import mongoose from 'mongoose';
import bodyPaser from 'body-parser';
import userSQLRoutes from './routes/userSQL';





//Creando servidor web
const server = new Server();

server.start(()=>{
    console.log(`Servidor corriendo en puerto ${server.puerto} y en host ${server.host}`);
});



// body parser
server.app.use(bodyPaser.urlencoded({extended:true}));
server.app.use(bodyPaser.json());



//Rutas aplicacion

server.app.use('/userSQL', userSQLRoutes);




//Conexión dataBase MySQL
connection.connect((error)=>{
    if(error){
        throw error
    }
    else{
        console.log("Aplicacion conectada a base de datos MySql")
    }
})

