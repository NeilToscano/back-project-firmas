import { generarJWT } from "../helpers/generar-jwt.js";
import Usuario from "../models/usuario.js";
export const lookup = async(req, res) => {
    const { uid } = req;
    try {
        const usuario = await Usuario.findById(uid).exec();
        if(!usuario){
            return res.status(400).json({
                msg:"Usuario no encontrado"
            })
        }
        //Generar JWT
        const token = await generarJWT( usuario.id, '1h' );
        const refreshtoken = await generarJWT( usuario.id, '7d' );
    
        return res.status(200).json({
            usuario,
            token,
            refreshtoken
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Ocurrió un error desconocido"
        });
    }
}