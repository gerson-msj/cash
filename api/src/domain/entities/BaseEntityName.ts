import { Column } from "typeorm";
import IBaseName from "../baseName";
import BaseEntity from "./BaseEntity";

export default abstract class BaseEntityName extends BaseEntity implements IBaseName {
    @Column({ length: 80 })
    nome: string = ''
}