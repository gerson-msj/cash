import type IEntityBaseName from "./entityBaseName"

export type CategoriaTipo = 'RECEITA' | 'DESPESA' | 'APORTE' | 'RETIRADA' | 'REALOCACAO'

export default interface ICategoria extends IEntityBaseName {
    categoriaTipo: CategoriaTipo
}