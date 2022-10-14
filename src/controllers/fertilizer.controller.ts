import {NextFunction, Request, Response} from 'express';
import {createFertilizer, deleteFertilizer, findAllFertilizers, updateFertilizer} from "../services/fertilizer.service";
import {CreateFertilizerInput, UpdateFertilizerInput} from "../schemas/fertilizer.schema";
import {deleteCrop} from "../services/crop.service";

export const findAllFertilizersHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const fertilizers = await findAllFertilizers({});

        res.status(200).status(200).json({
            status: 'success',
            data: {
                fertilizers,
            },
        });
    } catch (err: any) {
        next(err);
    }
};

export const createFertilizerHandler = async (
    req: Request<{}, {}, CreateFertilizerInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const {name, code} = req.body;
        const fertilizer = await createFertilizer({
            name,
            code
        });
        res.status(201).json({
            status: 'success',
            data: {
                fertilizer,
            },
        });
    } catch (err: any) {
        if (err.code === '23505') {
            return res.status(409).json({
                status: 'fail',
                message: 'Fertilizer with that code already exist',
            });
        }
        next(err);
    }
};

export const updateFertilizerHandler = async (req: Request<UpdateFertilizerInput>, res: Response, next: NextFunction) => {
    try {
        const {name, code} = req.body;
        const fertilizer = await updateFertilizer(req.params.id,{name, code});
        res.status(201).json({
            status: 'success',
            data: {
                fertilizer,
            },
        });
    } catch (err: any) {
        if (err.code === '23505') {
            return res.status(409).json({
                status: 'fail',
                message: 'Fertilizer with that code already exist',
            });
        }
        next(err);
    }
};

export const deleteFertilizerHandler = async (req: Request<any>, res: Response, next: NextFunction) => {
    try {
        await deleteFertilizer(req.params.id);
        res.status(202).json({
            status: 'success'
        });
    } catch (err: any) {
        return res.status(500).json({
            status: 'fail',
            message: 'Fertilizer cannot be deleted',
        });
    }
};
