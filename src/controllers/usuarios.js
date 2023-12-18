import Usuario from "../models/usuario.js";
import bcrypt from 'bcrypt'
export const usuarioPost = async(req, res) => {
    const { nombre, email, password } = req.body;
    const usuario = new Usuario({ nombre, email, password });
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();
    res.status(200).json({
        usuario
    })
}

