import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import EntityBaseName, { IEntityBaseName } from "./entityBaseName";
import IntegranteEntity from "./integrante";

export enum ContaTipo {
    /** Débito */
    Debito = 'DEBITO',

    /** Crédito */
    Credito = 'CREDITO',

    /** Reserva: Poupança, Invertimento, etc... */
    Reserva = 'RESERVA'
}

export interface IConta extends IEntityBaseName {
    contaTipo: ContaTipo
    diaVencimentoCredito?: number
    saldo: number
}

@Entity('contas')
export default class ContaEntity extends EntityBaseName implements IConta {

    @Column({ name: 'conta_tipo', enum: ContaTipo, type: 'varchar' })
    contaTipo!: ContaTipo

    @Column({ name: 'dia_vencimento_credito', nullable: true })
    diaVencimentoCredito?: number

    @Column()
    saldo: number = 0

    @ManyToOne(() => IntegranteEntity, (integrante) => integrante.contas, {
        nullable: false,
        onDelete: 'CASCADE',
        orphanedRowAction: "delete"
    })
    @JoinColumn({
        name: 'id_integrante',
        foreignKeyConstraintName: 'fk_integrante_conta'
    })
    integrante!: IntegranteEntity
}