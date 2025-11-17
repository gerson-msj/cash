import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { ContaTipo } from "../enums";
import EntityBaseName from "./EntityBaseName";
import IntegranteEntity from "./IntegranteEntity";

@Entity('contas')
export default class Conta extends EntityBaseName {

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