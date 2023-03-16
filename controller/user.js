const { response } = require('express');
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/user');


const userGet = async(req = request, res = response) => {
    // const { q, nombre, apikey, page = 1, limit } = req.query
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }
        // const usuarios = await Usuario.find(query)
        //     .skip(Number(desde))
        //     .limit(Number(limite))
        // const total = await Usuario.countDocuments()
        // const total = await Usuario.countDocuments(query)

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ])
    res.json({
        total,
        usuarios
    })
}

const userPut = async(req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body

    if (password) {
        //Encriptar contraseña 
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json(usuario)
}


const userPost = async(req, res = response) => {
    //const body = req.body Manera uno
    //Esto manera es de hacerlo sin encriptar
    // const body = req.body
    // const usuario = new Usuario(body)
    //Encryptando


    const { nombre, correo, password, rol } = req.body
    const usuario = new Usuario({ nombre, correo, password, rol });


    //Encriptar contraseña 
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt)


    //Guardar DB


    //Esto es necesario para que aparezca en mg compass y quede guardado 
    //Al hacer esto async es estricto todo lo que se puso obligatorio
    await usuario.save();

    res.json({
        usuario
    })
}

const userDelete = async(req, res = response) => {

    const { id } = req.params;

    // Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });


    res.json(usuario);
}

const userPatch = (req, res) => {
    res.status(403).json({
        msg: "patch API"
    });
}

module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete,
    userPatch

}