import { PrimaryGeneratedColumn } from "typeorm";
import IBase from "../base";

export default abstract class BaseEntity implements IBase {
    @PrimaryGeneratedColumn()
    id?: number

    remove?: boolean
}