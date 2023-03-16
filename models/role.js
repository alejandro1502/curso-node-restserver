const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    rol: {
        type: String
    }
});

module.exports = model('Role', RoleSchema);