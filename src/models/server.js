import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import authRoute from '../routes/auth.js'
import usuarioRoute from '../routes/usuarios.js'
import dbConnection from '../database/config.js';
import routerLookUp from '../routes/lookup.js'
import routerCloudinary from '../routes/files.js'
import routerPlantilla from '../routes/plantillas.js'
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';


export class server{
    constructor(){
        this.app = express();
        this.conectarDB();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use(cors());
        this.app.use(fileUpload());
        this.app.use(bodyParser.text());
        this.app.use( express.json() );
    }

    async conectarDB() {
        await dbConnection();
    }

    routes() {
        this.app.use('/api/auth', authRoute);
        this.app.use('/api/lookup', routerLookUp);
        this.app.use('/api/usuarios', usuarioRoute);
        this.app.use('/api/files', routerCloudinary);
        this.app.use('/api/plantillas', routerPlantilla)

    }

    listen() {
        this.app.listen(process.env.PORT, () => { console.log(`Servidor corriendo en el puerto ${process.env.PORT}`)} )
    }

}
