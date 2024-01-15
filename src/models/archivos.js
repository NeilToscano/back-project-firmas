import mongoose from "mongoose";
const { Schema, model } = mongoose;
const pdfFileSchema = new Schema({
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
    url: { type: String }
})
pdfFileSchema.methods.toJSON = function() {
    const { __v, estado, _id, ...data } = this.toObject();
    data.uid = _id;
    return data;
}

const PdfFileModel = model('PdfFile', pdfFileSchema); 

const PdfSharedModel = model('pdfShared', pdfFileSchema); 

export { PdfFileModel, PdfSharedModel };
// export default  model('pdfFile', pdfFileSchema);