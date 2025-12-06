import { PrimaryGeneratedColumn } from "typeorm";

export interface IEntityBase {
    id?: number
    remove?: boolean
}

export default abstract class EntityBase implements IEntityBase {
    @PrimaryGeneratedColumn()
    id?: number

    remove?: boolean
}
