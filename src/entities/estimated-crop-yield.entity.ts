import {Entity, ManyToOne, JoinColumn, Index, Column} from 'typeorm';
import Model from './model.entity';
import {Soil} from "./soil.entity";
import {Crop} from "./crop.entity";
import {Unit} from "./unit.entity";
import {Location} from "./location.entity";


@Entity('estimated_crop_yield')
@Index(['unit', 'crop'], { unique: true })
export class EstimatedCropYield extends Model {
    @Column({nullable: false})
    quantity: number;

    @ManyToOne(() => Crop, { eager: true })
    @JoinColumn()
    crop: Crop;

    @ManyToOne(() => Location, { eager: true })
    @JoinColumn()
    location: Location;

    @ManyToOne(() => Unit, { eager: true })
    @JoinColumn()
    unit: Unit;
}
