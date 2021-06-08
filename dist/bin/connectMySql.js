"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const connection = mysql_1.default.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "gestion_inmobiliaria",
    port: 3306
});
// connection.connect((error)=>{
//     if(error){
//         throw error
//     }
//     else{
//         console.log(`Aplicación conectada a base de datos MySQL`)
//     }
// });
exports.default = connection;
