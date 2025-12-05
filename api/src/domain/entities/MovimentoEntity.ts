import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { RepasseTipo } from "../enums";
import BaseEntity from "./BaseEntity";
import CategoriaEntity from "./CategoriaEntity";
import ContaEntity from "./ContaEntity";
import IntegranteEntity from "./IntegranteEntity";

@Entity('movimento')
export default class Movimento extends BaseEntity {

    @Column()
    ano!: number

    @Column()
    mes!: number

    @Column()
    dia!: number

    @Column()
    descricao!: string

    @ManyToOne(() => CategoriaEntity, {
        onDelete: 'RESTRICT'
    })
    @JoinColumn({
        name: 'id_categoria',
        foreignKeyConstraintName: 'fk_categoria_movimento'
    })
    categoria!: CategoriaEntity

    @ManyToOne(() => ContaEntity, {
        onDelete: 'RESTRICT'
    })
    @JoinColumn({
        name: 'id_conta',
        foreignKeyConstraintName: 'fk_conta_movimento'
    })
    conta!: ContaEntity

    @Column()
    valor!: number

    @Column({ name: 'repasse_tipo', enum: RepasseTipo, type: 'varchar' })
    repasseTipo!: RepasseTipo

    @Column({ name: 'repasse_valor' })
    repasseValor?: number

    @ManyToMany(() => IntegranteEntity, {
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
    integrantesRepasse?: IntegranteEntity[]
}