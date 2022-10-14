import {DeepPartial} from 'typeorm';
import {Crop} from '../entities/crop.entity';
import {AppDataSource} from '../utils/data-source';

const cropRepository = AppDataSource.getRepository(Crop);

export const createCrop = async (input: DeepPartial<Crop>) => {
    return cropRepository.save(cropRepository.create(input));
};

export const findAllCrops = async (query: Object) => {
    return await cropRepository.find(query);
};

export const findOneCropById = async (id: string) => {
    return await cropRepository.findOneBy({id: id});
};

export const updateCrop = async (id: string, input: DeepPartial<Crop>) => {
    return await cropRepository.update({id: id}, input);
};

export const findOneCrop = async (query: Object) => {
    return await cropRepository.findOneBy(query);
};

export const deleteCrop = async (id: string) => {
    return await cropRepository.delete({id: id});
};
