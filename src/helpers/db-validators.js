import Usuario from "../models/usuario.js"

export const emailExiste = async( email = '') => {

    const isEmail = await Usuario.findOne({ email }).exec();
    if(isEmail){
        throw new Error('E-mail ya existe');
    }
}