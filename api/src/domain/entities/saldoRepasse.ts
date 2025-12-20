import { IEntityBase } from "./entityBase";

export interface IRepasseSaldo extends IEntityBase {
    idRepasse: number
    idIntegrante: number
    saldo: number
}