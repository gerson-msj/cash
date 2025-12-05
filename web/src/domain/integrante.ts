import type IBaseName from "./baseName"
import type ICategoria from "./categoria"
import type IConta from "./conta"

export default interface IIntegrante extends IBaseName {
    nome: string
    email: string
    senha?: string
    principal: boolean
    contas?: IConta[]
    categorias?: ICategoria[]
}