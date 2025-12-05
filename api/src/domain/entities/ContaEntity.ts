import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import IConta from "../conta";
import { ContaTipo } from "../enums";
import BaseEntityName from "./BaseEntityName";
import IntegranteEntity from "./IntegranteEntity";

@Entity('contas')
export default class ContaEntity extends BaseEntityName implements IConta {

    @Column({ name: 'conta_tipo', enum: ContaTipo, type: 'varchar' })
    contaTipo!: ContaTipo

    @Column({ name: 'dia_vencimento_credito', nullable: true })
    diaVencimentoCredito?: number

    @Column()
    saldo: number = 0

    @ManyToOne(() => IntegranteEntity, (integrante) => integrante.contas, {
        nullable: false,
        onDelete: 'CASCADE'
    })
    @JoinColumn({
        name: 'id_integrante',
        foreignKeyConstraintName: 'fk_integrante_conta'
    })
    integrante!: IntegranteEntity
}