import express from 'express';
import {validate} from "../middleware/validate";
import {createCropSchema, updateCropSchema} from "../schemas/crop.schema";

const cropRouter = express.Router();
const api = require("../controllers/crop.controller");


cropRouter.post('/', validate(createCropSchema), api.createCropHandler);
cropRouter.get('/', api.findAllCropsHandler);
cropRouter.put('/:id', validate(updateCropSchema), api.updateCropHandler);
cropRouter.delete('/:id', api.deleteCropHandler);

export default cropRouter;
