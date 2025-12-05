import type ICategoria from "./categoria"
import type IConta from "./conta"
import type IModelEntityBase from "./modelEntityBase"

export default interface IIntegrante extends IModelEntityBase {
    nome: string
    email: string
    senha?: string
    principal: boolean
    contas: IConta[]
    categorias: ICategoria[]
}