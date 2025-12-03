import type ICategoria from "./categoria"
import type IConta from "./conta"

export default interface IIntegrante {
    id: number
    nome: string
    email: string
    principal: boolean
    contas: IConta[]
    categorias: ICategoria[]
}