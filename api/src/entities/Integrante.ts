import { Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm"
import Conta from "./Conta"
import EntityBase from "./EntityBase"
import Familia from "./Familia"

@Entity('integrantes')
export default class Integrante extends EntityBase {
    @ManyToOne(() => Familia, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'idFamilia' })
    familia!: Familia

    @OneToMany(() => Conta, (conta) => conta.integrante, {
        cascade: true,
        eager: true
    })
    contas?: Conta[]
}