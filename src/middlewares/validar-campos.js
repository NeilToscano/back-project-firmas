import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken';
export const validarCampos = (req, res, next) => {
    console.log(req.body)
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.send({ errors: result.array() })
    } 
    next();
}

export const validarJWT = (req, res, next) => {
    const data = req.body;
    const { idToken } = data;
    try {
        const decoded = jwt.verify(idToken, process.env.PRIVATE_KEY);
        const { uid } = decoded;
        req.uid = uid;
    } catch (error) {
        console.log(error);
        return res.status(400).json(
            {
                msg: "Token no válido"
            }
        )

    }
    next()

}
export const validarJWTHeader = (req, res, next) => {
    const data = req.headers;
    console.log(req.headers,'headers')
    const { idtoken } = data;
    try {
        const decoded = jwt.verify(idtoken, process.env.PRIVATE_KEY);
        const { uid } = decoded;
        req.uid = uid;
    } catch (error) {
        console.log(error);
        return res.status(400).json(
            {
                msg: "Token no válido"
            }
        )

    }
    next()

}
