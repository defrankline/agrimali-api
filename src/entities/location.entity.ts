import {Entity, Column, ManyToOne, OneToMany} from 'typeorm';
import Model from './model.entity';


@Entity('locations')
export class Location extends Model {
    @Column({nullable: false})
    name: string;

    @Column({nullable: false, unique: true})
    code: string;

    @ManyToOne((type) => Location, (location) => location.children)
    parent: Location

    @OneToMany((type) => Location, (location) => location.parent)
    children: Location[]
}
