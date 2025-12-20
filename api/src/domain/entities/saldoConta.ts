import { Column, Entity, JoinColumn, ManyToOne, RelationId } from "typeorm";
import ContaEntity, { IConta } from "./conta";
import DataRefEntity, { IDataRef } from "./dataRef";
import EntityBase, { IEntityBase, relationOptions, relationOptionsNullable } from "./entityBase";

export interface ISaldoConta extends IEntityBase {
    saldo: number
    idSaldoContaAnterior?: number

    dataRef: IDataRef
    saldoContaAnterior: ISaldoConta
    conta: IConta
}

@Entity('saldo_conta')
export default class SaldoContaEntity extends EntityBase implements ISaldoConta {

    @Column()
    saldo!: number

    @ManyToOne(() => DataRefEntity, relationOptions)
    @JoinColumn({ name: 'id_data_ref', foreignKeyConstraintName: 'fk__saldo_conta__data_ref' })
    dataRef!: DataRefEntity

    @ManyToOne(() => SaldoContaEntity, relationOptionsNullable)
    @JoinColumn({ name: 'id_saldo_conta_anterior', foreignKeyConstraintName: 'fk__saldo_conta__saldo_conta' })
    saldoContaAnterior!: SaldoContaEntity

    @RelationId('saldoContaAnterior')
    idSaldoContaAnterior?: number;

    @ManyToOne(() => ContaEntity, relationOptions)
    @JoinColumn({ name: 'id_conta', foreignKeyConstraintName: 'fk__saldo_conta__conta' })
    conta!: ContaEntity;

}