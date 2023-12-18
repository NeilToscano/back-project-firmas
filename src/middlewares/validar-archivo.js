export const validarArchivoSubir = (req, res, next) => {
    console.log(req.files, 'no hay archivo')
    if(!req.files || Object.keys(req.files).length === 0 || !req.files.archivo){
        return res.status(400).json({
            msg: "No hay archivos que subir - validar"
        })
    }
    next();
}