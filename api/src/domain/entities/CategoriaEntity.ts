import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import ICategoria from "../categoria";
import { CategoriaTipo } from "../enums";
import BaseEntityName from "./BaseEntityName";
import IntegranteEntity from "./IntegranteEntity";

@Entity('categorias')
export default class CategoriaEntity extends BaseEntityName implements ICategoria {

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