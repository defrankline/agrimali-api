import {Entity, ManyToOne, JoinColumn, Index} from 'typeorm';
import Model from './model.entity';
import {Soil} from "./soil.entity";
import {Crop} from "./crop.entity";


@Entity('soil_crops')
@Index(['soil', 'crop'], { unique: true })
export class SoilCrop extends Model {
    @ManyToOne(() => Soil, { eager: true })
    @JoinColumn()
    soil: Soil;

    @ManyToOne(() => Crop, { eager: true })
    @JoinColumn()
    crop: Crop;
}
