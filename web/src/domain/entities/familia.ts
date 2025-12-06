import type IEntityBaseName from "./entityBaseName"
import type IIntegrante from "./integrante"

export default interface IFamilia extends IEntityBaseName {
    nome: string
    integrantes?: IIntegrante[]
}

export const familiaDefault: IFamilia = {
    nome: ''
}