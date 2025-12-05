
import IIntegrante from "./integrante";
import IModelEntityBase from "./modelEntityBase";

export default interface IFamilia extends IModelEntityBase {
    nome: string
    integrantes?: IIntegrante[]
}