import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    name: string

    constructor()
    constructor(
        id?: number,
        name?: string
    ) {
        this.id = id || 0
        this.name = name || ''
    }
}