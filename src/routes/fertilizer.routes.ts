import express from 'express';
import {validate} from "../middleware/validate";
import {createFertilizerSchema, updateFertilizerSchema} from "../schemas/fertilizer.schema";

const fertilizerRouter = express.Router();
const api = require("../controllers/fertilizer.controller");


fertilizerRouter.post('/', validate(createFertilizerSchema), api.createFertilizerHandler);
fertilizerRouter.get('/', api.findAllFertilizersHandler);
fertilizerRouter.put('/:id', validate(updateFertilizerSchema), api.updateFertilizerHandler);
fertilizerRouter.delete('/:id', api.deleteFertilizerHandler);

export default fertilizerRouter;
