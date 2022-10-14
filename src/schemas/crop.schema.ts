import {object, string, TypeOf, z} from 'zod';
import {RoleEnumType} from '../entities/user.entity';



export const createCropSchema = object({
    body: object({
        name: string({
            required_error: 'name is required',
        }),
        code: string({
            required_error: 'code is required',
        })
    }),
});

export const updateCropSchema = object({
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

export type CreateCropInput = TypeOf<typeof createCropSchema>['body'];
export type UpdateCropInput = TypeOf<typeof updateCropSchema>['body'];
