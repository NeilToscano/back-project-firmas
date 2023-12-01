import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import authRoute from '../routes/auth.js'
import usuarioRoute from '../routes/usuarios.js'
import dbConnection from '../database/config.js';
export class server{
    constructor(){
        this.app = express();
        this.conectarDB();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use(cors());
        this.app.use( express.json() );
    }

    async conectarDB() {
        await dbConnection();
    }

    routes() {
        this.app.use('/api/auth', authRoute);
        this.app.use('/api/usuarios', usuarioRoute);
    }

    listen() {
        this.app.listen(process.env.PORT, () => { console.log(`Servidor corriendo en el puerto ${process.env.PORT}`)} )
    }

}
