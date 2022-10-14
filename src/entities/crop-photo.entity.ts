import {Entity, ManyToOne, JoinColumn, Index, Column} from 'typeorm';
import Model from './model.entity';
import {Soil} from "./soil.entity";
import {Crop} from "./crop.entity";


@Entity('crop_photos')
export class CropPhoto extends Model {
    @Column({nullable: false})
    photo: string;

    @ManyToOne(() => Crop, { eager: true })
    @JoinColumn()
    crop: Crop;
}
