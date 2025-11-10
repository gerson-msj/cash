import { Column, PrimaryGeneratedColumn } from "typeorm";

export default abstract class EntityBase {
    @PrimaryGeneratedColumn()
    id: number = 0

    @Column({ unique: true })
    nome: string = ''
}