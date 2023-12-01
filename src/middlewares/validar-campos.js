import { validationResult } from "express-validator";

export const validarCampos = (req, res, next) => {
    console.log(req.body);
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.send({ errors: result.array() })
    } 
    next();
}
