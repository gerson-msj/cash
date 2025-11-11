import { Entity } from "typeorm";
import IFamiliaModel from "../models/FamiliaModel";
import EntityBaseName from "./EntityBaseName";

@Entity('familias')
export default class FamiliaEntity extends EntityBaseName {


    constructor(model?: IFamiliaModel) {
        super();
        if (model) {
            this.id = model.id
            this.nome = model.nome
        }
    }
}