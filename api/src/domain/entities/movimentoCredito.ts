import { IDataRef } from "./dataRef";
import { IEntityBase } from "./entityBase";
import { IMovimento } from "./movimento";

export default interface IMovimentoCredito extends IEntityBase {

    /**
     * Representa o valor da parcela.
     */
    valor: number

    dataRef: IDataRef
    movimento: IMovimento
}