import {Entity, ManyToOne, JoinColumn, Index, Column} from 'typeorm';
import Model from './model.entity';
import {Crop} from "./crop.entity";
import {Fertilizer} from "./fertilizer.entity";


@Entity('crop_growth_stages')
export class CropGrowthStage extends Model {
    @ManyToOne(() => Crop, {eager: true})
    @JoinColumn()
    crop: Crop;

    @ManyToOne(() => Fertilizer, {eager: true})
    @JoinColumn()
    fertilizer: Fertilizer;

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    description: string;

    @Column({nullable: false})
    position: number;
}
