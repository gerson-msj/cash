import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import EntityBase from "./EntityBase";
import Integrante from "./Integrante";

@Entity('contas')
export default class Conta extends EntityBase {

    @Column()
    reserva: boolean = false

    @ManyToOne(() => Integrante, (integrante) => integrante.contas, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'idIntegrante' })
    integrante?: Integrante
}