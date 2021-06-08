import {Router, Response, Request} from 'express';
import {Token} from '../class/token';
import { verificarToken } from '../middlewares/authentication';
import jwt from 'jsonwebtoken';
import connection from '../bin/connectmysql';
import { json } from 'body-parser';
import query from '../utils/promesas'
import userRoutes from './usuarios';
import Usuario from '../models/usuarios.model';
import bcrypt from 'bcrypt';
import emailClass from '../class/email';



const userSQLRoutes = Router();
//se prueba la ruta
userSQLRoutes.get('/pruebaSQL', (req:Request, res:Response)=>{

    res.json({
                estado: "success",
                mensaje: "pruebaok"
             })    
});

//Este funciona OK es el INSERT!!!!
userSQLRoutes.post('/createUser', async (req:any, res:Response)=>{

    try{
        const user ={
                    nombre : req.body.nombre_usuario,
                    password : bcrypt.hashSync(req.body.password,10),
                    email : req.body.email_usuario,
                    telefono : req.body.telefono,
                    estado : req.body.estado,
                    }

        const emailEnvio = new emailClass()
        const envio = await emailEnvio.enviarEmail(user.email, "Creacion cuenta", "Su cuenta se ha creado con exito", "");
            
        await query("start transaction");
        await query ("INSERT INTO USUARIOS(NOMBRE_USUARIO, PASSWORD, EMAIL_USUARIO, TELEFONO, ESTADO)VALUES(?,?,?,?,?)",[user.nombre, user.password, user.email, user.telefono, user.estado]);
        await query("commit");

        res.json({
                  estado: "successsql",
                  mensaje: user,
                  emailResult: envio
                }) 
        }    
        catch(error){
        const rollback = await query("rollback");
        res.json({
                  estado:"error",
                  data:error, 
                  rollabck:rollback});
        }
})


// este debajo no me salio es e que hay que laburar
userSQLRoutes.get('/consultarUsuario', async (req,res)=>{

    try{
        const user = 
        {
                    id: req.body.id_usuario,
                    nombre : req.body.nombre_usuario,
                    password : req.body.password,
                    email : req.body.email_usuario,
                    telefono : req.body.telefono,
                    estado : req.body.estado
        }    
    
    await query("select * from usuarios where nombre_usuario=?",[user.nombre]);
    
    //console.log(nombre_usuario)
        res.json({
                  estado: "succes",
                  data: user
                 })
    }  
    catch(error){
        console.log(error);
    }    
})




export default userSQLRoutes;