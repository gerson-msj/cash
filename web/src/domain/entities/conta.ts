import type IEntityBaseName from "./entityBaseName"

export const ContaTipos = {
    Debito: 'DEBITO',
    Credito: 'CREDITO',
    Reserva: 'RESERVA'
} as const

export type ContaTipo = (typeof ContaTipos)[keyof typeof ContaTipos]

export default interface IConta extends IEntityBaseName {
    contaTipo: ContaTipo
    diaVencimentoCredito?: number
    saldo: number
}

export const contaTipoText: Record<ContaTipo, string> = {
    DEBITO: 'Débito',
    CREDITO: 'Crédito',
    RESERVA: 'Reserva'
}

export const contaText = (conta: IConta) =>
    `${conta.nome} - tipo: ${contaTipoText[conta.contaTipo]}`
