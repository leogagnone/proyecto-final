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
const usuarios_model_1 = __importDefault(require("../models/usuarios.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const authentication_1 = require("../middlewares/authentication");
const usuarios_1 = __importDefault(require("../controllers/usuarios"));
const email_1 = __importDefault(require("../class/email"));
const userRoutes = express_1.Router();
userRoutes.get('/prueba', (req, res) => {
    res.json({
        estado: "success",
        mensaje: "ok"
    });
});
// userRoutes.post('/login',(req:Request, res:Response)=>{
//     Usuario.findOne({email: req.body.email} ,null, null, (error, result)=>{
//         if(error){
//             throw error
//         }
//         if(!result){
//             return res.json({
//                 estado: "succes",
//                 mensaje: "usuario no encontrado en base de datos",
//                 data: result
//             })
//         }
//         if(result.compararPassword(req.body.password)){
//             const tokenJwt = Token.getToken({
//                 id: result.id,
//                 nombre: result.nombre,
//                 email: result.email,
//                 avatar: result.avatar
//             })
//             return res.json({
//                 estado: "succes",
//                 mensaje: "usuario encontrado",
//                 data: result,
//                 token: tokenJwt
//             })
//         }
//         else {
//             return res.json({
//                 estado: "succes",
//                 mensaje: "usuario no encontrado en base de datos",
//                 data: result
//             })
//         }
//     })
// });
userRoutes.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        nombre_usuario: req.body.NOMBRE_USUARIO,
        password: bcrypt_1.default.hashSync(req.body.PASSWORD, 10),
        email_usuario: req.body.email_usuario,
        telefono: req.body.telefono,
        estado: req.body.estado
    };
    const emailEnvio = new email_1.default();
    const result = yield usuarios_model_1.default.create(user);
    const envio = yield emailEnvio.enviarEmail(user.email_usuario, "Creacion cuenta", "Su cuenta se ha creado con exito", "");
    res.json({
        estado: "success",
        mensaje: result,
        emailResult: envio
    });
    //esto conentado es viejo no se usa
    // Usuario.create(user)
    //     .then(async result=>{
    //         const emailEnvio = new emailClass()
    //         await emailEnvio.enviarEmail(req.body.email,"Creacion cuenta", "Su cuenta se ha creado con exito", "")
    //         res.json({
    //             estado:"success",
    //             mensaje: result 
    //         })
    //     })
    //     .catch(error=>{
    //         res.json({
    //             estado: "error",
    //             mensaje: error
    //         })
    //     })
}));
//userRoutes.put('/update', verificarToken, (req:any, res:Response)=>{
//
//    res.json({
//        estado: "succes",
//        mensaje: req.usuario
//
//    })
//})
//hasta aca no se usa
//esti si
// userRoutes.put('/update', verificarToken, (req:any, res:Response)=>{
//    const user = {
//        nombre: req.body.nombre,
//        email: req.body.email,
//        avatar: req.body.avatar
//    }
//desde aca no se usa
//    let user:any = {};
//    const atributos = ["nombre", "email", "avatar", "password"];
//    atributos.forEach(item=>{
//        if(req.body[item] != null){
//            if(item == 'password'){
//                user[item] = bcrypt.hashSync(req.body[item], 10)
//            }
//            else{
//                user[item] = req.body[item]
//            }
//        }
//    });
//hasta aca
//    Usuario.findByIdAndUpdate(req.usuario.id, user,{new:true},(error, result)=>{
//        if(error){
//            throw error
//        }
//        if(!result){
//            res.json({
//                estado: "success",
//                mensaje: "usuario no existe en la base"
//            })
//        }
//        if(result){
//        const tokenNuevo = Token.getToken({
//             id: req.usuario.id,
//             nombre: req.usuario.nombre,
//             email: req.usuario.email,
//            })
//            res.json({
//                estado: "success",
//                data: result,
//                refreshToken: tokenNuevo
//            })
//         }
//    })
// })
// userRoutes.get('/' , verificarToken, async (req:any, res:Response)=>{
//     const usuario = req.usuario;
//     const email = new emailClass();
//     const emailInfo = await email.enviarEmail("ingindustrial.gu", "envio_email", "",
//         "<h1> cuerpo email </h1>"
//     )
//     res.json({
//         estado:"success",
//         mensaje: usuario,
//         emailInfo: emailInfo
//     })
// })
userRoutes.get('/', authentication_1.verificarToken, usuarios_1.default.token);
exports.default = userRoutes;
