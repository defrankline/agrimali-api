import {DeepPartial} from 'typeorm';
import {Fertilizer} from '../entities/fertilizer.entity';
import {AppDataSource} from '../utils/data-source';

const fertilizerRepository = AppDataSource.getRepository(Fertilizer);

export const createFertilizer = async (input: DeepPartial<Fertilizer>) => {
    return fertilizerRepository.save(fertilizerRepository.create(input));
};

export const findAllFertilizers = async (query: Object) => {
    return await fertilizerRepository.find(query);
};

export const findOneFertilizerById = async (id: string) => {
    return await fertilizerRepository.findOneBy({id: id});
};

export const updateFertilizer = async (id: string, input: DeepPartial<Fertilizer>) => {
    return await fertilizerRepository.update({id: id}, input);
};

export const findOneFertilizer = async (query: Object) => {
    return await fertilizerRepository.findOneBy(query);
};

export const deleteFertilizer = async (id: string) => {
    return await fertilizerRepository.delete({id: id});
};
