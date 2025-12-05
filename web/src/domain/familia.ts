import type IIntegrante from "./integrante";
import type IModelEntityBase from "./modelEntityBase";

export default interface IFamilia extends IModelEntityBase {
    nome: string
    integrantes?: IIntegrante[]
}

export const familiaDefault: IFamilia = {
    nome: '',
    integrantes: []
}