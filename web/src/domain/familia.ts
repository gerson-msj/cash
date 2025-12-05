import type IBaseName from "./baseName"
import type IIntegrante from "./integrante"

export default interface IFamilia extends IBaseName {
    nome: string
    integrantes?: IIntegrante[]
}

export const familiaDefault: IFamilia = {
    nome: ''
}