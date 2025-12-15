import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm"
import CategoriaEntity, { ICategoria } from "./categoria"
import ContaEntity, { IConta } from "./conta"
import EntityBaseName, { IEntityBaseName } from "./entityBaseName"
import FamiliaEntity from "./familia"

export interface IIntegrante extends IEntityBaseName {
    nome: string
    email: string
    senha?: string
    principal: boolean
    contas?: IConta[]
    categorias?: ICategoria[]
}

@Entity('integrantes')
export default class IntegranteEntity extends EntityBaseName implements IIntegrante {

    @Column({ unique: true, nullable: false, length: 80 })
    email: string = ''

    @Column({ nullable: false, length: 20 })
    senha?: string = ''

    @Column({ nullable: false })
    principal: boolean = false

    @ManyToOne(() => FamiliaEntity, {
        nullable: false,
        onDelete: 'CASCADE',
        orphanedRowAction: 'delete'
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