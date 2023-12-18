import { text } from "express";
import { uploadSignature } from "../helpers/upload-files.js";
import { plantillaImageModel } from "../models/imagenPlantilla.js";
import { PlantillaModel, UserOwnplantillaModel } from "../models/plantilla.js"
import usuario from "../models/usuario.js";

export const savePlantilla = async(req, res) => {// Upload
    const { texthtml } = req.body
    const { archivo } = req.files
    const { nombre,  uid, categoria } = req.query;
    console.log(uid);
    if(!texthtml){
        return res.status(400).json({
            ok: false,
            msg: 'error'
        })
    }


    else{
        try {
            const data = {
                nombre: nombre,
                estado: true,
                usuario: uid ,
                contenido: `${texthtml}`,
                categoria: categoria
            }
            const plantilla= new PlantillaModel( data )
            await plantilla.save();

            const imageInfo = await uploadSignature( archivo.data );

            // ! guaradar imagen
            const dataImage = {
                nombre: imageInfo.nombreImage,
                estado: true,
                usuario: uid,
                plantilla: plantilla.id,
                url: imageInfo.urlImage
            }
            const imagenPlantilla = new plantillaImageModel( dataImage );
            await imagenPlantilla.save();
            return res.status(200).json({
                plantilla,
                imagenPlantilla
            });
            
        } catch (error) {
            console.log(error)
            return res.status(400).json({
                ok: false,
                msg: 'error'
            })
        }
        
    }
}

export const getPlantilla = async(req, res) => {// get plantilla
    const { id } = req.query
    console.log(JSON.stringify(id),'idpasado')
    try {
        // Obtener archivos que posee 
        const plantilla = await PlantillaModel.findById( id ).exec();
        if(!plantilla){
            console.log('entra error-ga-no plantilla');
            return res.status(400).json({
                ok: false,
                msg: `No hay plantillas con ese id`
            })
        }

        else{
            console.log('entra a verdadero');
            return res.status(200).json(plantilla);
        }
        
    } catch (error) {
        console.log('entra error-ga-catch');
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Ocurrió un error"
        })
    }

}
export const getImagePlantilla = async(req, res) => {// get plantilla

    try {
        // Obtener archivos que posee 
        const plantillaImage = await plantillaImageModel.find().exec();
        if(!plantillaImage){
            return res.status(400).json({
                ok: false,
                msg: `No hay plantilla-img`
            })
        }

        else{
            console.log(plantillaImage);
            return res.status(200).json(plantillaImage);
        }
        
    } catch (error) {
        console.log(error);
    }

}


//**Save own's user Plantilla */
export const userPlantilla = async(req, res) => {// Upload
    const { texthtml } = req.body
    const { nombre,  uid, email, categoria, receivedNotify } = req.query;
    console.log("enviar al email:", email)
    console.log('notify', receivedNotify);
    console.log(uid, nombre,categoria, receivedNotify);
    const receivedUser = await usuario.find({ email: receivedNotify}).exec();
    console.log('receiver', receivedUser);
    console.log(texthtml);
    if(!receivedUser){
        return res.status(400).json({
            ok: false,
            msg: 'error'
        })
    }


    else{
        try {
            const data = {
                nombre: nombre,
                estado: true,
                usuario: uid ,
                email,
                receivedNotify: receivedUser[0].id,
                contenido: `${texthtml}`,
                categoria: categoria
            }
            const plantilla= new UserOwnplantillaModel( data )
            await plantilla.save();
            return res.status(200).json({
                ok: true,
                msg: plantilla
            })
            
        } catch (error) {
            console.log(error)
            return res.status(400).json({
                ok: false,
                msg: 'error'
            })
        }
        
    }
}


//**Put own's user Plantilla */
export const userPlantillaUpdate = async(req, res) => {// Upload
    const { texthtml } = req.body
    const { id } = req.query;
    console.log(texthtml);
    console.log(id);

    try {
            const updatePlantilla = await UserOwnplantillaModel.findByIdAndUpdate( 
                id, { contenido: texthtml }, {
                    returnOriginal: false
                }

            )
            return res.status(200).json({
                ok: true,
                msg: updatePlantilla
            })
            
        } catch (error) {
            console.log(error)
            return res.status(400).json({
                ok: false,
                msg: 'error'
            })
    }
        
    
}

export const getSharedPlantilla = async(req, res) => {

    const { id } = req.query;
    const receivedUser = await UserOwnplantillaModel.find({ receivedNotify: id }).exec();

    if(!receivedUser){
        return res.status(400).json({
            ok: false,
            msg: 'error'
        })
    }


    else{
       
        return res.status(200).json({
            ok: true,
            msg: receivedUser
        })
        
    }
}
export const getSharedByUser = async(req, res) => {// Obtener plantillas que compartí

    const { id } = req.query;
    console.log({ id })
    const sendUser = await UserOwnplantillaModel.find({ usuario: id }).exec();
    if(!sendUser){
        return res.status(400).json({
            ok: false,
            msg: 'error'
        })
    }


    else{
       
        return res.status(200).json({
            ok: true,
            msg: sendUser
        })
        
    }
}
export const getSharedPlantillaUid = async(req, res) => {// Upload

    const { id } = req.query;
    console.log(id,'otro')
    const receivedUser = await UserOwnplantillaModel.findById(id).exec();
    const correo = await usuario.findById(receivedUser.usuario);

    if(!receivedUser){
        return res.status(400).json({
            ok: false,
            msg: 'error',
        })
    }


    else{
       
        return res.status(200).json({
            ok: true,
            msg: receivedUser,
            email: correo.email
        })
        
    }
}