const { response } = require('express');
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/user')

const login = async(req, res = response) => {

    const { correo, password } = req.body
    try {
        //Verificar si el Email existe 
        const usuario = await Usuario.findOne({ correo })
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos - Correo'
            })
        }
        //Si el usuario existe 
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos - estado: false'
            })
        }
        //Verificar la constraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password)
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos - Password'
            })
        }
        //Generar el JWT
        res.json({
            msg: "Login Ok "
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador "
        });

    }



}

module.exports = {
    login
}