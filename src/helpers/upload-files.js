
import { BlobServiceClient } from '@azure/storage-blob';
import { v4 as uuidv4 } from 'uuid';

import { v2 as cloudinary } from 'cloudinary'
// ! Upload Cloudinary
export const uploadImage = async (imagePath) => {

    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    try {
  
    const uploadResult = await new Promise( (resolve) => {
        cloudinary.uploader.upload_stream( (error, uploadResult) => {
            return resolve(uploadResult);
        }).end(imagePath);
    })
    console.log(uploadResult);
      return;
    } catch (error) {
      console.error(error);
    }
};


// ! TODO  UPLOAD AZURE
export const uploadArchivo = async(dataPdf) => {// Upload

    const namePdfContainer = 'onelooppdf';
    const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
    try {
        
        if (!AZURE_STORAGE_CONNECTION_STRING) {
        throw Error('Azure Storage Connection string not found');
        }

        // Create the BlobServiceClient object with connection string
        const blobServiceClient = BlobServiceClient.fromConnectionString(
        AZURE_STORAGE_CONNECTION_STRING
        );

        // Get a reference to a container
        const containerClient = blobServiceClient.getContainerClient(namePdfContainer);
        
        // Create a unique name for the blob
        const blobName = 'oneloop' + uuidv4() + '.pdf';

        // Get a block blob client
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        // Display blob name and url
        console.log(
            `\nUploading to Azure storage as blob\n\tname: ${blobName}:\n\tURL: ${blockBlobClient.url}`
            );
            
        const uploadBlobResponse = await blockBlobClient.upload(dataPdf, dataPdf.length);
        await blockBlobClient.setHTTPHeaders({
            blobHTTPHeaders: {
              blobContentType: 'application/pdf',
              blobContentDisposition: 'inline' // Esto indica que se descargará al abrir el enlace
            }
          });
        console.log(
        `Blob was uploaded successfully. requestId: ${uploadBlobResponse.requestId}`
        );
        return { ok: true, urlPdf: blockBlobClient.url, nombrePdf: blobName }

    } catch (error) {
        console.log(error);
        return { ok: false }
    }
}
//  TODO REVIEW GET UPLOADS
export const getuploadFiles = async() => {// Upload

    const namePdfContainer = 'onelooppdf';
    const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
    try {
        
        if (!AZURE_STORAGE_CONNECTION_STRING) {
        throw Error('Azure Storage Connection string not found');
        }

        // Create the BlobServiceClient object with connection string
        const blobServiceClient = BlobServiceClient.fromConnectionString(
        AZURE_STORAGE_CONNECTION_STRING
        );

        // Get a reference to a container
        const containerClient = blobServiceClient.getContainerClient(namePdfContainer);

        // List the blob(s) in the container.
        for await (const blob of containerClient.listBlobsFlat()) {
          // Get Blob Client from name, to get the URL
          const tempBlockBlobClient = containerClient.getBlockBlobClient(blob.name);

          // Display blob name and URL
          console.log(
            `\n\tname: ${blob.name}\n\tURL: ${tempBlockBlobClient.url}\n`
          );
        }
      
        return { ok: true }

    } catch (error) {
        console.log(error);
        return { ok: false }
    }
}

// ! TODO  UPLOAD IMAGE AZURE
export const uploadSignature = async(dataImage) => {// Upload
  const namePdfContainer = 'oneloopimagenes';
  const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
  try {
      
      if (!AZURE_STORAGE_CONNECTION_STRING) {
      throw Error('Azure Storage Connection string not found');
      }

      // Create the BlobServiceClient object with connection string
      const blobServiceClient = BlobServiceClient.fromConnectionString(
      AZURE_STORAGE_CONNECTION_STRING
      );

      // Get a reference to a container
      const containerClient = blobServiceClient.getContainerClient(namePdfContainer);
      
      // Create a unique name for the blob
      const blobName = 'oneloop' + uuidv4() + '.png';

      // Get a block blob client
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      // Display blob name and url
      console.log(
          `\nUploading to Azure storage as blob\n\tname: ${blobName}:\n\tURL: ${blockBlobClient.url}`
          );
          
      const uploadBlobResponse = await blockBlobClient.upload(dataImage, dataImage.length);
      await blockBlobClient.setHTTPHeaders({
        blobHTTPHeaders: {
          blobContentType: 'image/png',
        }
      });
   
      console.log(
      `Blob was uploaded successfully. requestId: ${uploadBlobResponse.requestId}`
      );
      return { ok: true, urlImage: blockBlobClient.url, nombreImage: blobName }

  } catch (error) {
      console.log(error);
      return { ok: false }
  }
}