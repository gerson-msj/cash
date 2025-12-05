import type IModelEntityBase from "./modelEntityBase"

export type CategoriaTipo = 'RECEITA' | 'DESPESA' | 'APORTE' | 'RETIRADA' | 'REALOCACAO'

export default interface ICategoria extends IModelEntityBase {
    nome: string
    categoriaTipo: CategoriaTipo
}