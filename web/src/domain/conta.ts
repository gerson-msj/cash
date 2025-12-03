export type ContaTipo = 'DEBITO' | 'CREDITO' | 'RESERVA'

export default interface IConta {
    id: number
    nome: string
    contaTipo: ContaTipo
    diaVencimentoCredito?: number
    saldo: number
}