import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import CategoriaEntity, { ICategoria } from "./categoria";
import DataRefEntity, { IDataRef } from "./dataRef";
import EntityBase, { IEntityBase, relationOptions } from "./entityBase";

export interface ISaldoCategoria extends IEntityBase {
    saldo: number

    dataRef: IDataRef
    categoria: ICategoria
}

@Entity('saldo_categoria')
export default class SaldoCategoriaEntity extends EntityBase implements ISaldoCategoria {

    @Column()
    saldo!: number;

    @ManyToOne(() => DataRefEntity, relationOptions)
    @JoinColumn({ name: 'id_data_ref', foreignKeyConstraintName: 'fk__saldo_categoria__data_ref' })
    dataRef!: DataRefEntity;

    @ManyToOne(() => CategoriaEntity, relationOptions)
    @JoinColumn({ name: 'id_categoria', foreignKeyConstraintName: 'fk__saldo_categoria__categoria' })
    categoria!: CategoriaEntity;

}