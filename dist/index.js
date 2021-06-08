"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./class/server"));
const body_parser_1 = __importDefault(require("body-parser"));
const connectmysql_1 = __importDefault(require("./bin/connectmysql"));
//Creando servidor web
const server = new server_1.default();
server.start(() => {
    console.log(`Server running on port ${server.puerto} and host ${server.host}`);
});
// body parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//Conexión dataBase MySQL
connectmysql_1.default.connect((error) => {
    if (error) {
        throw error;
    }
    else {
        console.log("Aplicacion conectada a base de datos MySql");
    }
});
