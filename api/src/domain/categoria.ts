import IBaseName from "./baseName"

export type CategoriaTipo = 'RECEITA' | 'DESPESA' | 'APORTE' | 'RETIRADA' | 'REALOCACAO'

export default interface ICategoria extends IBaseName {
    categoriaTipo: CategoriaTipo
}