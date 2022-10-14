import {Entity, ManyToOne, JoinColumn, Column} from 'typeorm';
import Model from './model.entity';
import {Crop} from "./crop.entity";
import {Location} from "./location.entity";


@Entity('sowing')
export class Sowing extends Model {
    @ManyToOne(() => Crop, {eager: true})
    @JoinColumn()
    crop: Crop;

    @ManyToOne(() => Location, {eager: true})
    @JoinColumn()
    location: Location;

    @Column({nullable: false})
    fromDate: Date;

    @Column({nullable: false})
    toDate: Date;
}
