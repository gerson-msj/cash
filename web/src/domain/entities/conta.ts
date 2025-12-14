import type IEntityBaseName from "./entityBaseName"

export const ContaTipos = {
    Credito: 'CREDITO',
    Debito: 'DEBITO',
    Reserva: 'RESERVA'
} as const

type map = typeof ContaTipos
type key = keyof map

export type ContaTipo = map[key]

export default interface IConta extends IEntityBaseName {
    contaTipo: ContaTipo
    diaVencimentoCredito?: number
    saldo: number
}

export const contaDefault: IConta = {
    nome: '',
    contaTipo: ContaTipos.Credito,
    saldo: 0
}

export const contaTipoText: Record<ContaTipo, string> = {
    DEBITO: 'Débito',
    CREDITO: 'Crédito',
    RESERVA: 'Reserva'
}

export const contaText = (conta: IConta) =>
    `${conta.nome} (${contaTipoText[conta.contaTipo]}${conta.contaTipo === ContaTipos.Credito ? ` - ${conta.diaVencimentoCredito}` : ''})`
