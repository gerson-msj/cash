import { Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm"
import Categoria from "./Categoria"
import Conta from "./Conta"
import EntityBaseName from "./EntityBaseName"
import FamiliaEntity from "./FamiliaEntity"

@Entity('integrantes')
export default class Integrante extends EntityBaseName {

    @ManyToOne(() => FamiliaEntity, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({
        name: 'id_familia',
        foreignKeyConstraintName: 'fk_familia_integrante'
    })
    familia!: FamiliaEntity

    @OneToMany(() => Conta, (conta) => conta.integrante, {
        cascade: true,
        eager: true
    })
    contas?: Conta[]

    @OneToMany(() => Categoria, (categoria) => categoria.integrante, {
        cascade: true,
        eager: true
    })
    categorias?: Categoria[]
}