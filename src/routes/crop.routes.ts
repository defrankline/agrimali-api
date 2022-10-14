import express from 'express';
import {validate} from "../middleware/validate";
import {createCropSchema} from "../schemas/crop.schema";

const cropRouter = express.Router();
const api = require("../controllers/crop.controller");


cropRouter.post('/', validate(createCropSchema), api.createCropHandler);
cropRouter.get('/', api.findAllCropsHandler);
cropRouter.put('/:id', api.updateCropHandler);

export default cropRouter;
