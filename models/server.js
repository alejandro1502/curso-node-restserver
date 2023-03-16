const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const swaggerUi = require('swagger-ui-express')
const swaggerDoc = require('../swagger.json')

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.usuariosPath = '/api/user'
        this.authPath = '/api/auth'

        //Conectar a base de datos despues de realizar el config 
        this.conectarDB();
        //Middelewares
        this.middelwares();
        //Rutas de mi aplicacion 
        this.routes();
    }


    async conectarDB() {
        await dbConnection();
    }

    middelwares() {
        //CORS 
        this.app.use(cors());

        //Lectura y parseo del body 
        this.app.use(express.json());
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));


        //Directorio publico 
        this.app.use(express.static('public'));

        // this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/user'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Example app listening on port ', this.port)
        })
    }



}

module.exports = Server;
