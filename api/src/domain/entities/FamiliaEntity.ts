import { Entity, OneToMany } from "typeorm";
import EntityBaseName from "./EntityBaseName";
import IntegranteEntity from "./IntegranteEntity";

@Entity('familias')
export default class FamiliaEntity extends EntityBaseName {

    @OneToMany(() => IntegranteEntity, (integrante) => integrante.familia, {
        cascade: true
    })
    integrantes?: IntegranteEntity[]
}