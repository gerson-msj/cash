export enum ContaTipo {
    /** Débito */
    Debito = 'DEBITO',

    /** Crédito */
    Credito = 'CREDITO',

    /** Reserva: Poupança, Invertimento, etc... */
    Reserva = 'RESERVA'
}

export enum CategoriaTipo {
    /** Receitas: Salário, Extras, 13º, etc... */
    Receita = 'RECEITA',

    /** Despesas: Pessoal, Fixo, Mercado, Lazer, etc... */
    Despesa = 'DESPESA',

    /** Aporte: Aporte financeiro (ganhos, recebimento de juros, transferências de entrada, etc...) */
    Aporte = 'APORTE',

    /** Retirada: Retirada fianceira (perdas, pagamentos de juros, transferências de saida, etc...) */
    Retirada = 'RETIRADA',

    /** Realocação: Realocação financeira entre contas pessoais (Transferência Pessoal, Balanceamento, etc...) */
    Realocacao = 'REALOCACAO',
}

export enum RepasseTipo {
    /** Sem repasse */
    Nenhum = 'NENHUM',

    /** Percentual com base nas Receitas */
    Percentual = 'PERCENTUAL',

    /** Meio a Meio */
    Equilibrado = 'EQUILIBRADO',

    /** Total */
    Total = 'TOTAL'
}
