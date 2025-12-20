import { IEntityBase } from "./entityBase";

export interface IRepasse extends IEntityBase {
    idMovimento: number
    idIntegrante: number
    percentual: number
}