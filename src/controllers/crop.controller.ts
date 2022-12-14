import {NextFunction, Request, Response} from 'express';
import {createCrop, deleteCrop, findAllCrops, updateCrop} from "../services/crop.service";
import {CreateCropInput, UpdateCropInput} from "../schemas/crop.schema";

export const findAllCropsHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const crops = await findAllCrops({});

        res.status(200).status(200).json({
            status: 'success',
            data: {
                crops,
            },
        });
    } catch (err: any) {
        next(err);
    }
};

export const createCropHandler = async (
    req: Request<{}, {}, CreateCropInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const {name, code} = req.body;
        const crop = await createCrop({
            name,
            code
        });
        res.status(201).json({
            status: 'success',
            data: {
                crop,
            },
        });
    } catch (err: any) {
        if (err.code === '23505') {
            return res.status(409).json({
                status: 'fail',
                message: 'Crop with that code already exist',
            });
        }
        next(err);
    }
};

export const updateCropHandler = async (req: Request<UpdateCropInput>, res: Response, next: NextFunction) => {
    try {
        const {name, code} = req.body;
        const crop = await updateCrop(req.params.id, {name, code});
        res.status(201).json({
            status: 'success',
            data: {
                crop,
            },
        });
    } catch (err: any) {
        if (err.code === '23505') {
            return res.status(409).json({
                status: 'fail',
                message: 'Crop with that code already exist',
            });
        }
        next(err);
    }
};

export const deleteCropHandler = async (req: Request<any>, res: Response, next: NextFunction) => {
    try {
         await deleteCrop(req.params.id);
        res.status(202).json({
            status: 'success'
        });
    } catch (err: any) {
        return res.status(500).json({
            status: 'fail',
            message: 'Crop cannot be deleted',
        });
    }
};
