import type IIntegrante from "./integrante";

export default interface IFamilia {
    id: number
    nome: string
    integrantes: IIntegrante[]
}

export const familiaDefault: IFamilia = {
    id: 0,
    nome: '',
    integrantes: []
}