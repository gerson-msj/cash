import type IModelEntityBase from "./modelEntityBase"

export type ContaTipo = 'DEBITO' | 'CREDITO' | 'RESERVA'

export default interface IConta extends IModelEntityBase {
    nome: string
    contaTipo: ContaTipo
    diaVencimentoCredito?: number
    saldo: number
}