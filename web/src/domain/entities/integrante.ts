import type ICategoria from "./categoria"
import type IConta from "./conta"
import type IEntityBaseName from "./entityBaseName"

export default interface IIntegrante extends IEntityBaseName {
    nome: string
    email: string
    senha?: string
    principal: boolean
    contas?: IConta[]
    categorias?: ICategoria[]
}

export const integranteDefault: IIntegrante = {
    nome: '',
    email: '',
    principal: false
}