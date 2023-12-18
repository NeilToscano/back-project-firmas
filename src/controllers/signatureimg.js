import { uploadSignature } from "../helpers/upload-files.js";
import { SignatureModel } from "../models/imagenSignature.js";
import Usuario from "../models/usuario.js";

// TODO UPLOAD Signature
export const Signature = async(req, res) => {// Upload
    const { data } = req.files.archivo;
    const { uid } = req.query
    console.log("entra signature img")
    const usuarioDB = await Usuario.findById(uid).exec();
    if(!usuarioDB){
        return res.status(400).json({
            msg: `El usuario con id ${uid} no existe`
        })
    }
    const resp = await uploadSignature(data);

    if(resp.ok){
        const data = {
            nombre: resp.nombreImage,
            estado: true,
            usuario: uid ,
            url: resp.urlImage,
        }
        const signatureImage= new SignatureModel( data )
        await signatureImage.save();

        return res.status(200).json(resp);
    }
    else{
        return res.status(400).json(resp);
    }
}