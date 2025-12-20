import { IEntityBase } from "./entityBase";
import { IIntegrante } from "./integrante";
import { IMovimento } from "./movimento";

export enum RepasseTipo {
    /** Com base nos proventos */
    Percentual = 'PERCENTUAL',

    /** Divisão exata */
    Equilibrado = 'EQUILIBRADO',

    /** Repasse total */
    Total = 'TOTAL'
}

export interface IMovimentoRepasse extends IEntityBase {
    repasseTipo: RepasseTipo
    valor: number

    movimento: IMovimento
    integrante: IIntegrante
}