import { generarJWT } from "../helpers/generar-jwt.js";
import { Usuario } from "../models/usuario.js";
import bcrypt from 'bcrypt';
export const login = async(req, res) => {
    const { email, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ email }).exec();
        if(!usuario){
            return res.status(400).json({
                msg:"Usuario-Password no son correctos"
            })
        }
        const validPassword = bcrypt.compareSync(password,usuario.password)
        if(!validPassword){
            return res.status(400).json({
                msg: "Usuario-Password no son validos"
            })
        }
        //Generar JWT
        const token = await generarJWT( usuario.id );
    
        return res.status(200).json({
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Ocurrió un error desconocido"
        });
    }
}