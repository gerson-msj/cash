import { Column, Entity, JoinColumn, ManyToOne, RelationId } from "typeorm";
import CategoriaEntity, { ICategoria } from "./categoria";
import ContaEntity, { IConta } from "./conta";
import DataRefEntity, { IDataRef } from "./dataRef";
import EntityBase, { IEntityBase, relationOptions } from "./entityBase";

export interface IMovimento extends IEntityBase {
    dia: number
    descricao: string

    /**
     * Quando em uma conta de *crédito*, representa o valor total da compra.
     * 
     * O valor das parcelas estará no *movimento de crédito*.
     */
    valor: number

    dataRef: IDataRef
    categoria: ICategoria
    conta: IConta
}

@Entity('movimento')
export default class MovimentoEntity extends EntityBase implements IMovimento {

    /*
     * Campos RelationId servem apenas para retornar o Id, quando eager = false.
     * Não servem para criar um registro, para tal, é preciso converter esse id
     * em um 'stub' na propriedade de relacionamento.
     * neste caso, mv: {id: x} <-- stub (esboço, fake, objeto mínimo).
     * Campos relationId são completamente ignorados na criação.
     */
    @RelationId('dataRef')
    idDataRef!: number

    @Column()
    dia!: number;

    @RelationId('categoria')
    idCategoria!: number;

    @RelationId('conta')
    idConta!: number;

    @Column()
    descricao!: string;

    @Column()
    valor!: number;


    @ManyToOne(() => DataRefEntity, relationOptions)
    @JoinColumn({ name: 'id_data_ref', foreignKeyConstraintName: 'fk__movimento__data_ref' })
    dataRef!: DataRefEntity

    @ManyToOne(() => CategoriaEntity, relationOptions)
    @JoinColumn({ name: 'id_categoria', foreignKeyConstraintName: 'fk__movimento__categoria' })
    categoria!: CategoriaEntity

    @ManyToOne(() => ContaEntity, relationOptions)
    @JoinColumn({ name: 'id_conta', foreignKeyConstraintName: 'fk__movimento__conta' })
    conta!: ContaEntity
}