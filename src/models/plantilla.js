import mongoose from "mongoose";
const { Schema, model } = mongoose;
const plantillaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'usuario',
        required: true
    },
    email: {
        type: String,
        default: 'neil@gmail.com'
    },
    receivedNotify: {
        type: Schema.Types.ObjectId,
        default: '65722ea9a99e5bbab9acd72e'
    },
    contenido: {
        type: String,
        required:true
    },
    categoria: {
        type: String,
        required:true
    }
})
plantillaSchema.methods.toJSON = function() {
    const { __v, estado, _id, ...data } = this.toObject();
    data.uid = _id;
    return data;
}

const PlantillaModel = model('plantilla', plantillaSchema); 
const UserOwnplantillaModel = model('userplantillaown', plantillaSchema); 


export { PlantillaModel, UserOwnplantillaModel };
// export default  model('pdfFile', pdfFileSchema);