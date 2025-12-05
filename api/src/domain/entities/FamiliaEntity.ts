import { Entity, OneToMany } from "typeorm";
import IFamilia from "../familia";
import BaseEntityName from "./BaseEntityName";
import IntegranteEntity from "./IntegranteEntity";

@Entity('familias')
export default class FamiliaEntity extends BaseEntityName implements IFamilia {

    @OneToMany(() => IntegranteEntity, (integrante) => integrante.familia, {
        cascade: true
    })
    integrantes?: IntegranteEntity[]
}