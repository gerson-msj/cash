import { Entity, OneToMany } from "typeorm";
import EntityBaseName, { IEntityBaseName } from "./entityBaseName";
import IntegranteEntity, { IIntegrante } from "./integrante";

export interface IFamilia extends IEntityBaseName {
    nome: string
    integrantes?: IIntegrante[]
}

@Entity('familias')
export default class FamiliaEntity extends EntityBaseName implements IFamilia {

    @OneToMany(() => IntegranteEntity, (integrante) => integrante.familia, {
        cascade: true
    })
    integrantes?: IntegranteEntity[]
}
