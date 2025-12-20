import { PrimaryGeneratedColumn, RelationOptions } from "typeorm";

export interface IEntityBase {
    id?: number
    remove?: boolean
}

export const relationOptions: RelationOptions = {
    eager: true,
    nullable: false,
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
}

/**
 * Utilizado para referência circular.
 */
export const relationOptionsNullable: RelationOptions = {
    eager: true,
    nullable: true,
    onDelete: 'NO ACTION',
    orphanedRowAction: 'nullify'
}

export default abstract class EntityBase implements IEntityBase {
    @PrimaryGeneratedColumn()
    id?: number

    remove?: boolean
}