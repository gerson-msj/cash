import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm"
import IIntegrante from "../integrante"
import BaseEntityName from "./BaseEntityName"
import CategoriaEntity from "./CategoriaEntity"
import ContaEntity from "./ContaEntity"
import FamiliaEntity from "./FamiliaEntity"

@Entity('integrantes')
export default class IntegranteEntity extends BaseEntityName implements IIntegrante {

    @Column({ unique: true, nullable: false, length: 80 })
    email: string = ''

    @Column({ nullable: false, length: 20 })
    senha?: string = ''

    @Column({ nullable: false })
    principal: boolean = false

    @ManyToOne(() => FamiliaEntity, {
        nullable: false,
        onDelete: 'CASCADE'
    })
    @JoinColumn({
        name: 'id_familia',
        foreignKeyConstraintName: 'fk_familia_integrante'
    })
    familia?: FamiliaEntity

    @OneToMany(() => ContaEntity, (conta) => conta.integrante, {
        cascade: true,
        eager: true
    })
    contas?: ContaEntity[]

    @OneToMany(() => CategoriaEntity, (categoria) => categoria.integrante, {
        cascade: true,
        eager: true
    })
    categorias?: CategoriaEntity[]
}