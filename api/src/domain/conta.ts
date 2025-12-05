import IBaseName from "./baseName"

export type ContaTipo = 'DEBITO' | 'CREDITO' | 'RESERVA'

export default interface IConta extends IBaseName {
    contaTipo: ContaTipo
    diaVencimentoCredito?: number
    saldo: number
}