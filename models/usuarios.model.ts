

import {Schema, model, Document} from 'mongoose';
import bcrypt from 'bcrypt';


const usuarioSchema = new Schema({

    nombre_usuario:{
        type:String,
        required:[true, "El nombre es necesario"]
    },
    password:{
        type: String,
        required:[true, "La clave es requerida"]
    },
    email_usuario:{
        type:String,
        unique: true,
        required:[true, "El email es requerido"]
    },    
    telefono:{
        type:String,
        required:[true, "El telefono es necesario"]
    },
    estado:{
        type:String
        
    }

});

usuarioSchema.method('compararPassword', function(password:string = ""):boolean{

    //@ts-ignore
    if(bcrypt.compareSync(password, this.password)){
        return true
    }
    else{
        return false
    }
})

interface Iusuario extends Document {
        id_usuario: string,
        nombre_usuario:string,
        password:string,
        email_usuario:string,
        telefono:string,
        estado:string

    compararPassword(password:string):boolean

}

const Usuario = model<Iusuario>('Usuario', usuarioSchema);

export default Usuario;