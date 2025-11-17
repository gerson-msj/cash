import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { CategoriaTipo } from "../enums";
import EntityBaseName from "./EntityBaseName";
import IntegranteEntity from "./IntegranteEntity";

@Entity('categorias')
export default class Categoria extends EntityBaseName {

    @Column({ name: 'categoria_tipo', enum: CategoriaTipo, type: 'varchar' })
    categoriaTipo!: CategoriaTipo

    @ManyToOne(() => IntegranteEntity, (integrante) => integrante.contas, {
        nullable: false,
        onDelete: 'CASCADE'
    })
    @JoinColumn({
        name: 'id_integrante',
        foreignKeyConstraintName: 'fk_integrante_categoria'
    })
    integrante!: IntegranteEntity
}