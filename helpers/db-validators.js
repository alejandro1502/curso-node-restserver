const Role = require('../models/role');
const Usuario = require('../models/user')

const RoleValidate = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la DB`)
    }
}
const EmailExiste = async(correo = '') => {
    const existeEmail = await Usuario.findOne({ correo })
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya existe`)
    }
}
const ExisteUsuarioPorId = async(id) => {
    const existeUsuario = await Usuario.findById(id);
    if (existeUsuario) {
        throw new Error(`El ID ${id} no existe`)
    }
}

module.exports = {
    RoleValidate,
    EmailExiste,
    ExisteUsuarioPorId

}