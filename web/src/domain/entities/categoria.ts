import type IEntityBaseName from "./entityBaseName"

export const CategoriaTipos = {
    Receita: 'RECEITA',
    Despesa: 'DESPESA',
    Aporte: 'APORTE',
    Retirada: 'RETIRADA',
    Realocacao: 'REALOCACAO'
} as const

type map = typeof CategoriaTipos
type key = keyof map
export type CategoriaTipo = map[key]

export default interface ICategoria extends IEntityBaseName {
    categoriaTipo: CategoriaTipo
}

export const CategoriaDefault: ICategoria = {
    nome: '',
    categoriaTipo: CategoriaTipos.Receita
}

export const categoriaTipoText: Record<CategoriaTipo, string> = {
    RECEITA: 'Receita',
    DESPESA: 'Despesa',
    APORTE: 'Aporte',
    RETIRADA: 'Retirada',
    REALOCACAO: 'Realocação'
}

export const categoriaText = (categoria: ICategoria) =>
    `${categoria.nome} - tipo: ${categoriaTipoText[categoria.categoriaTipo]}`
