const { Router } = require('express');
const { check } = require('express-validator');

const { userGet, userPut, userPost, userDelete, userPatch } = require('../controller/user');

const { RoleValidate, EmailExiste, ExisteUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.get('/', userGet);
router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(ExisteUsuarioPorId),
    check('rol').custom(RoleValidate),
    validarCampos
], userPut);

router.post('/', [
    //Esto es para validar el correo 
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener mas de 6 letras').isLength({ min: 6 }),
    check('correo').custom(EmailExiste),
    check('rol').custom(RoleValidate),
    validarCampos
], userPost);
router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(ExisteUsuarioPorId),
    validarCampos
], userDelete);
router.patch('/', userPatch);


module.exports = router;