import { PrimaryGeneratedColumn } from "typeorm";

export default abstract class EntityBase {
    @PrimaryGeneratedColumn()
    id: number = 0
}