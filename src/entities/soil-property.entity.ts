import {Entity, Column, Index, BeforeInsert, ManyToOne, JoinColumn} from 'typeorm';
import bcrypt from 'bcryptjs';
import Model from './model.entity';
import {Soil} from "./soil.entity";


@Entity('soil_properties')
export class SoilProperty extends Model {
    @Column({nullable: false})
    property: string;

    @ManyToOne(() => Soil, { eager: true })
    @JoinColumn()
    soil: Soil;
}
