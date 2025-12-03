
export type CategoriaTipo = 'RECEITA' | 'DESPESA' | 'APORTE' | 'RETIRADA' | 'REALOCACAO'

export default interface ICategoria {
    id: number
    nome: string
    categoriaTipo: CategoriaTipo
}