import IBaseName from "./baseName";
import IIntegrante from "./integrante";

export default interface IFamilia extends IBaseName {
    nome: string
    integrantes?: IIntegrante[]
}