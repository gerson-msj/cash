import { Column } from "typeorm";
import EntityBase, { IEntityBase } from "./entityBase";

export interface IEntityBaseName extends IEntityBase {
    nome: string
}

export default abstract class EntityBaseName extends EntityBase implements IEntityBaseName {
    id?: number | undefined;
    @Column({ length: 80 })
    nome: string = ''
}