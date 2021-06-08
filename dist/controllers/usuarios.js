"use strict";
module.exports = {
    token: (req, res, next) => {
        const request = req;
        const usuario = request.usuario.id;
        console.log("request", req);
        res.json({
            estado: "succes",
            mensaje: usuario
        });
        next();
    }
};
