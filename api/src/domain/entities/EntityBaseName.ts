import { Column } from "typeorm";
import EntityBase from "./EntityBase";

export default abstract class EntityBaseName extends EntityBase {
    @Column({ length: 80 })
    nome: string = ''
}