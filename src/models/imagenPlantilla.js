import mongoose from "mongoose";
const { Schema, model } = mongoose;
const plantillaImage = new Schema({
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
    plantilla: {
        type: Schema.Types.ObjectId,
        ref : 'pdfShared',
        required: true,
    },
    url: { type: String }
})
plantillaImage.methods.toJSON = function() {
    const { __v, estado, _id, ...data } = this.toObject();
    data.id = _id;
    return data;
}

const plantillaImageModel = model('plantillaimage', plantillaImage); 



export { plantillaImageModel };
