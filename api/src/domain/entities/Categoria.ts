import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { CategoriaTipo } from "../enums";
import EntityBaseName from "./EntityBaseName";
import Integrante from "./Integrante";

@Entity('categorias')
export default class Categoria extends EntityBaseName {

    @Column({ name: 'categoria_tipo', enum: CategoriaTipo, type: 'varchar' })
    categoriaTipo!: CategoriaTipo

    @ManyToOne(() => Integrante, (integrante) => integrante.contas, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({
        name: 'id_integrante',
        foreignKeyConstraintName: 'fk_integrante_categoria'
    })
    integrante!: Integrante
}