import { Column, Entity, Unique } from "typeorm";
import EntityBase, { IEntityBase } from "./entityBase";

export interface IDataRef extends IEntityBase {
    mes: number
    ano: number
}

@Entity('data_ref')
@Unique('uk_data_ref', ['mes', 'ano'])
export default class DataRefEntity extends EntityBase implements IDataRef {

    @Column()
    mes!: number;

    @Column()
    ano!: number;
}
