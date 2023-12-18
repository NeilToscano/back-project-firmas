// import { v2 as cloudinary } from 'cloudinary'
// import  { uploadImage }  from '../helpers/upload-files.js';
// // Return "https" URLs by setting secure: true
// cloudinary.config({
//     cloud_name: 'dvult5ws1',
//     api_key: '511971864486664',
//     api_secret:'J8ssjWUu0JI9_a1vAF7HcRqAQHk',
//     secure: true,

// });

// export const cloudinaryFiles = async(req, res) => {
//     const name= req.files;

//     await uploadImage(name.imagen.data)

//
import { BlobServiceClient } from '@azure/storage-blob';
import { v4 as uuidv4 } from 'uuid';
import { getuploadFiles, uploadArchivo } from '../helpers/upload-files.js';
import { PdfFileModel, PdfSharedModel } from "../models/archivos.js";
import Usuario from '../models/usuario.js';



export const azureBlobsStorage = async(req, res) => {// crear contenedor

    const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
    try {
        
        if (!AZURE_STORAGE_CONNECTION_STRING) {
        throw Error('Azure Storage Connection string not found');
        }

        // Create the BlobServiceClient object with connection string
        const blobServiceClient = BlobServiceClient.fromConnectionString(
        AZURE_STORAGE_CONNECTION_STRING
        );
                // Create a unique name for the container
        const containerName = 'quickstart' + uuidv4();

        console.log('\nCreating container...');
        console.log('\t', containerName);

        // Get a reference to a container
        const containerClient = blobServiceClient.getContainerClient(containerName);
        // Create the container
        const createContainerResponse = await containerClient.create();
        console.log(
        `Container was created successfully.\n\trequestId:${createContainerResponse.requestId}\n\tURL: ${containerClient.url}`
        );


    } catch (error) {
        console.log(error);
    }
}


// TODO UPLOAD
export const uploadFilePdf = async(req, res) => {// Upload
    const { data } = req.files.archivo;
    const { uid } = req.query

    const usuarioDB = await Usuario.findById(uid).exec();
    if(!usuarioDB){
        return res.status(400).json({
            msg: `El usuario con id ${uid} no existe`
        })
    }
    const resp = await uploadArchivo(data);

    if(resp.ok){
        const data = {
            nombre: resp.nombrePdf,
            estado: true,
            usuario: uid ,
            url: resp.urlPdf,
        }
        const pdf = new PdfFileModel( data )
        await pdf.save();

        return res.status(200).json(resp);
    }
    else{
        return res.status(400).json(resp);
    }
}

// TODO GET FILES

export const getFilePdf = async(req, res) => {// Upload

    const { uid } = req.query
    try {
        // Obtener archivos que posee 
        const pdf = await PdfFileModel.find( { usuario: uid });
    
        if(!pdf){
            return res.status(400).json({
                ok: false,
                msg: `No tiene Archivos-pdf`
            })
        }

        else{
            return res.status(200).json(pdf);
        }
        
    } catch (error) {
        console.log(error);
    }
}

// ! ALL ABOUT SHARED FILES

export const uploadSharedPdf = async(req, res) => {// Upload
    console.log("entra");
    const { data } = req.files.archivo;
    const { uid, email } = req.query

    const usuarioDB = await Usuario.findById(uid).exec();
    const usuarioDB_dest = await Usuario.findOne({ email: email }).exec();

    if(!usuarioDB || !usuarioDB_dest){
        return res.status(400).json({
            msg: `El usuario con email ${email} no existe`
        })
    }
    const resp = await uploadArchivo(data);

    if(resp.ok){
        const data = {
            nombre: resp.nombrePdf,
            estado: true,
            usuario: uid ,
            url: resp.urlPdf,
        }
        const pdf = new PdfFileModel( data )
        await pdf.save();
        
        // guardar para el destinatario
        const data_dest = {
            nombre: resp.nombrePdf,
            estado: true,
            usuario: usuarioDB_dest.id,
            url: resp.urlPdf,
        }
        const pdf_shared = new PdfSharedModel( data_dest )
        await pdf_shared.save();


        return res.status(200).json(resp);
    }
    else{
        return res.status(400).json(resp);
    }
}


export const getSharedPdf= async(req, res) => {// Upload

    const { uid } = req.query
    try {
        // Obtener archivos que posee 
        const pdfShared = await PdfSharedModel.find( { usuario: uid });
    
        if(!pdfShared){
            return res.status(400).json({
                ok: false,
                msg: `No tiene Archivos-pdf-compartidos`
            })
        }

        else{
            return res.status(200).json(pdfShared);
        }
        
    } catch (error) {
        console.log(error);
    }
}
