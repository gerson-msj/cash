import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { RepasseTipo } from "../enums";
import Categoria from "./Categoria";
import Conta from "./Conta";
import EntityBase from "./EntityBase";
import Integrante from "./Integrante";

@Entity('movimento')
export default class Movimento extends EntityBase {

    @Column()
    ano!: number

    @Column()
    mes!: number

    @Column()
    dia!: number

    @Column()
    descricao!: string

    @ManyToOne(() => Categoria, {
        onDelete: 'RESTRICT'
    })
    @JoinColumn({
        name: 'id_categoria',
        foreignKeyConstraintName: 'fk_categoria_movimento'
    })
    categoria!: Categoria

    @ManyToOne(() => Conta, {
        onDelete: 'RESTRICT'
    })
    @JoinColumn({
        name: 'id_conta',
        foreignKeyConstraintName: 'fk_conta_movimento'
    })
    conta!: Conta

    @Column()
    valor!: number

    @Column({ name: 'repasse_tipo', enum: RepasseTipo, type: 'varchar' })
    repasseTipo!: RepasseTipo

    @Column({ name: 'repasse_valor' })
    repasseValor?: number

    @ManyToMany(() => Integrante, {
        cascade: true,
        onDelete: 'CASCADE'
    })
    @JoinTable({
        name: 'movimento_repasse_integrante',
        joinColumn: {
            name: 'id_movimento',
            foreignKeyConstraintName: 'fk_movimento_repasse'
        },
        inverseJoinColumn: {
            name: 'id_integrante',
            foreignKeyConstraintName: 'fk_integrante_repasse',
        }
    })
    integrantesRepasse?: Integrante[]
}