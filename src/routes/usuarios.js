import { Router } from "express";
import { body } from "express-validator";
import { usuarioPost } from "../controllers/usuarios.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { emailExiste } from "../helpers/db-validators.js";


const router = Router();

router.post('/',[
    body('nombre').notEmpty().withMessage("El nombre es obligatorio"),
    body('password').isLength({ min: 8 }).withMessage("La contraseña debe ser mayor a 8 caracteres"),
    body('email').isEmail().withMessage("El correo debe ser válido"),
    body('email').custom(emailExiste),
    validarCampos], usuarioPost);

export default router;