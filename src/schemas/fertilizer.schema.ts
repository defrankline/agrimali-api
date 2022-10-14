import {object, string, TypeOf, z} from 'zod';

export const createFertilizerSchema = object({
    body: object({
        name: string({
            required_error: 'name is required',
        }),
        code: string({
            required_error: 'code is required',
        })
    }),
});

export const updateFertilizerSchema = object({
    body: object({
        id: string({
            required_error: 'id is required',
        }),
        name: string({
            required_error: 'name is required',
        }),
        code: string({
            required_error: 'code is required',
        })
    }),
});

export type CreateFertilizerInput = TypeOf<typeof createFertilizerSchema>['body'];
export type UpdateFertilizerInput = TypeOf<typeof updateFertilizerSchema>['body'];
