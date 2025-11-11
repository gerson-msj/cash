import { Column } from "typeorm";
import EntityBase from "./EntityBase";

export default abstract class EntityBaseName extends EntityBase {
    @Column({ unique: true })
    nome: string = ''
}