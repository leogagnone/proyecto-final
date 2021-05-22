import Server from "./class/server";





//Creando servidor web
const server = new Server();

server.start(()=>{
    console.log(`Server running on port ${server.puerto} and host ${server.host}`);
});