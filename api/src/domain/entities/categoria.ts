import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import EntityBaseName, { IEntityBaseName } from "./entityBaseName";
import IntegranteEntity from "./integrante";

export enum CategoriaTipo {
    /** Receitas: Salário, Extras, 13º, etc... */
    Receita = 'RECEITA',

    /** Despesas: Pessoal, Fixo, Mercado, Lazer, etc... */
    Despesa = 'DESPESA',

    /** Aporte: Aporte financeiro (ganhos, recebimento de juros, transferências de entrada, etc...) */
    Aporte = 'APORTE',

    /** Retirada: Retirada finaceira (perdas, pagamentos de juros, transferências de saida, etc...) */
    Retirada = 'RETIRADA',

    /** Realocação: Realocação financeira entre contas pessoais (Transferência Pessoal, Balanceamento, etc...) */
    Realocacao = 'REALOCACAO',
}

export interface ICategoria extends IEntityBaseName {
    categoriaTipo: CategoriaTipo
}

@Entity('categorias')
export default class CategoriaEntity extends EntityBaseName implements ICategoria {

    @Column({ name: 'categoria_tipo', enum: CategoriaTipo, type: 'varchar' })
    categoriaTipo!: CategoriaTipo

    /**
     * Neste relacionamento, no save, uma categoria não informada no integrante
     * é removida.
     * Para ignorar a exclusão, categoria deve ser undefined, pois um array[0]
     * Irá remover todas as categorias.
     * Ademais, manter nullable true e retirar orphaned, ao não informar
     * um registro no array ele apenas terá o relacionamento quebrado
     * e a remoção (remove) terá que ser manual.
     */
    @ManyToOne(() => IntegranteEntity, (integrante) => integrante.contas, {
        nullable: false,
        onDelete: 'CASCADE',
        orphanedRowAction: 'delete'
    })
    @JoinColumn({
        name: 'id_integrante',
        foreignKeyConstraintName: 'fk_integrante_categoria'
    })
    integrante!: IntegranteEntity
}