import { Router } from "express";
import { getImagePlantilla, getPlantilla, getSharedByUser, getSharedPlantilla, getSharedPlantillaUid, savePlantilla, userPlantilla, userPlantillaUpdate } from "../controllers/plantillas.js";

const router = Router();

router.post('', savePlantilla);
router.get('', getPlantilla);
router.get('/image', getImagePlantilla);

router.post('/user', userPlantilla);
router.put('/user', userPlantillaUpdate);

router.get('/myshared', getSharedByUser); // las que compartí

router.get('/shared', getSharedPlantilla);
router.get('/sharedtemplate', getSharedPlantillaUid);


export default router;