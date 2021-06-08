import {Token} from '../class/token';
import { NextFunction, Response } from 'express';

export const verificarToken = (req:any, res:Response, next:NextFunction)=>{

    const userToken = req.get('x-token') || "";

    Token.checkToken(userToken).then(decoded=>{
        console.log(decoded);
        //@ts-ignore
        req.usuario = decoded.usuario.insertId;
        next()
    })
    .catch(error=>{
        res.json({
            estado:"succes",
            mensaje:"Token incorrecto",
            error: error
        })
    })




}


