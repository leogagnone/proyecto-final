"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const promesas_1 = __importDefault(require("../utils/promesas"));
// INSERT INTO PERSONAS(NOMBRE,APELLIDO, TIPO_DOCUMENTO, NUMERO_DOCUMENTO) VALUES()
//INSERT INTO USUARIOS (...)VALUES(...)
//"INSERT INTO PERSONAS(NOMBRE, APELLIDO, TIPO_DOCUMENTO, NUMERO_DOCUMENTO)VALUES('"+nombre+"','"+apellido+"','"+tipo_documento+"', '"+numero_documento+"')" //Forma diferente de agregar variables en un query
const userSQLRoutes = express_1.Router();
// userRoutes.get('/consultarUsuario', async (req,res)=>{
//     const numero_documento = req.body.numero_documento;
//     const persona = await query("select * from personas where numero_documento = ?",[numero_documento]);
//     res.json({
//         data: persona
//     })
// })
userSQLRoutes.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const nombre_usuario = body.NOMBRE_USUARIO;
        const password = body.PASSWORD;
        const email_usuario = body.email_usuario;
        const telefono = body.telefono;
        const estado = body.estado;
        yield promesas_1.default("start transaction");
        yield promesas_1.default("INSERT INTO USUARIOS(NOMBRE_USUARIO,PASSWORD,EMAIL_USUARIO,TELEFONO,ESTADO)VALUES(?,?,?,?,?)", [nombre_usuario, password, email_usuario, telefono, estado]);
        yield promesas_1.default("commit");
        res.json({ estado: "success" });
    }
    catch (error) {
        const rollback = yield promesas_1.default("rollback");
        res.json({ estado: "error", data: error, rollabck: rollback });
    }
    // catch(error){
    //     const rollback = await query("rollback");
    //     res.json({estado:"error", data:error, rollabck:rollback});
    // }
    // query("start transaction",[])
    //     .then(resultTransaction => 
    //         query("INSERT INTO PERSONAS(NOMBRE, APELLIDO, TIPO_DOCUMENTO, NUMERO_DOCUMENTO)VALUES(?,?,?,?)",[nombre, apellido, tipo_documento, numero_documento])
    //     )
    //     .then(resultPersona => 
    //         query("INSERT INTO USUARIOS(ID_USUARIO, NOMBRE_USUARIO,PASSWORD)VALUES(?,?,?)",[resultPersona.insertId, nombre_usuario, password])
    //     )
    //     .then(resultUsuarios =>
    //         query("commit",[])
    //     )
    //     .then(resultCommit => 
    //         res.json({estado: "success", data:resultCommit})
    //     )
    //     .catch(error=>{
    //         query("rollback",[])
    //         res.json({estado:"error", data:error})
    //     })
    // .then(resultQuery=>{
    //     query("INSERT INTO USUARIOS(ID_USUARIO, NOMBRE_USUARIO,PASSWORD)VALUES(?,?,?)",[resultQuery.insertId, nombre_usuario, password])
    // .then(resultUsuarios =>res.json({estado: "success", data:resultUsuarios}))
    // })
    // .catch(error=>res.json({estado:"error", data:error}))
    // connection.query("INSERT INTO PERSONAS(NOMBRE, APELLIDO, TIPO_DOCUMENTO, NUMERO_DOCUMENTO)VALUES(?,?,?,?)",[nombre, apellido, tipo_documento, numero_documento],(error,result)=>{
    //     if(error){
    //         console.log(error)
    //     }
    //     else{
    //         connection.query("INSERT INTO USUARIOS(ID_USUARIO, NOMBRE_USUARIO,PASSWORD)VALUES(?,?,?)",[result.insertId, nombre_usuario, password],(error,resultUsuarios)=>{
    //             if(error){
    //                 console.log(error)
    //             }
    //             else{
    //                 res.json({
    //                     estado:"success",
    //                     data: resultUsuarios
    //                 })
    //             }
    //         })
    //     }
    // })
}));
exports.default = userSQLRoutes;
