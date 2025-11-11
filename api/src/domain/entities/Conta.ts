import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { ContaTipo } from "../enums";
import EntityBaseName from "./EntityBaseName";
import Integrante from "./Integrante";

@Entity('contas')
export default class Conta extends EntityBaseName {

    @Column({ name: 'conta_tipo', enum: ContaTipo, type: 'varchar' })
    contaTipo!: ContaTipo

    @Column({ name: 'dia_vencimento_credito', nullable: true })
    diaVencimentoCredito?: number

    @Column()
    saldo: number = 0

    @ManyToOne(() => Integrante, (integrante) => integrante.contas, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({
        name: 'id_integrante',
        foreignKeyConstraintName: 'fk_integrante_conta'
    })
    integrante!: Integrante
}