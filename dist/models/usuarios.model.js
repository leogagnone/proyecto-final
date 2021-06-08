"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuarioSchema = new mongoose_1.Schema({
    nombre_usuario: {
        type: String,
        required: [true, "El nombre es necesario"]
    },
    password: {
        type: String,
        required: [true, "La clave es requerida"]
    },
    email_usuario: {
        type: String,
        unique: true,
        required: [true, "El email es requerido"]
    },
    telefono: {
        type: String,
        required: [true, "El telefono es requerido"]
    },
    estado: {
        type: String
    },
});
usuarioSchema.method('compararPassword', function (password = "") {
    //@ts-ignore
    if (bcrypt_1.default.compareSync(password, this.password)) {
        return true;
    }
    else {
        return false;
    }
});
const Usuario = mongoose_1.model('Usuario', usuarioSchema);
exports.default = Usuario;
