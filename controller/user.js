const { response } = require('express')

const userGet = (req, res = response) => {
    const { q, nombre, apikey, page = 1, limit } = req.query

    res.status(403).json({
        msg: "get API - controlador",
        q,
        nombre,
        apikey,
        page,
        limit
    })
}

const userPut = (req, res = response) => {
    const id = req.params.id;

    res.status(500).json({
        msg: "put API - controlador ",
        id
    })
}

const userPost = (req, res) => {
    //const body = req.body Manera uno
    const { nombre, age } = req.body

    res.status(201).json({
        msg: "post API",
        nombre,
        age
    })
}

const userDelete = (req, res) => {
    res.status(403).json({
        msg: "delete API"
    })
}

const userPatch = (req, res) => {
    res.status(403).json({
        msg: "patch API"
    })
}

module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete,
    userPatch

}