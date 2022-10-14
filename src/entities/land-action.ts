import {Entity, ManyToOne, JoinColumn, Index, Column} from 'typeorm';
import Model from './model.entity';
import {Soil} from "./soil.entity";
import {Crop} from "./crop.entity";
import {LandActionPeriod} from "./land-action-period";


@Entity('land_actions')
export class LandAction extends Model {
    @Column({nullable: false})
    description: string;

    @ManyToOne(() => Crop, {eager: true})
    @JoinColumn()
    crop: Crop;

    @Column({
        type: "enum",
        enum: LandActionPeriod,
        default: LandActionPeriod.PRE_PLANTING
    })
    period: LandActionPeriod;

    @Column({nullable: false})
    position: number;
}
