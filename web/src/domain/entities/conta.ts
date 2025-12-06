import type IEntityBaseName from "./entityBaseName"

export type ContaTipo = 'DEBITO' | 'CREDITO' | 'RESERVA'

export default interface IConta extends IEntityBaseName {
    contaTipo: ContaTipo
    diaVencimentoCredito?: number
    saldo: number
}