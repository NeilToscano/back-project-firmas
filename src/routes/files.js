import { Router } from "express";

import { getFilePdf, getSharedPdf, uploadFilePdf, uploadSharedPdf} from "../controllers/files.js";
import { validarArchivoSubir } from "../middlewares/validar-archivo.js";
import { validarCampos, validarJWTHeader } from "../middlewares/validar-campos.js";
import { header } from "express-validator";
import { Signature } from "../controllers/signatureimg.js";
import { userPlantilla } from "../controllers/plantillas.js";

const router = Router();

router.post('',[ validarArchivoSubir ], uploadFilePdf);
router.get('',getFilePdf);

router.post('/shared', [ validarArchivoSubir ], uploadSharedPdf);
router.get('/shared', getSharedPdf);

router.post('/images',Signature );

export default router;