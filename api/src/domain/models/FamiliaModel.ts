import FamiliaEntity from "../entities/FamiliaEntity";
import ModelBase from "./ModelBase";

export default class FamiliaModel extends ModelBase {
    nome: string = ''

    fromBody(body: string): boolean {
        const data = JSON.parse(body) as FamiliaModel

        const isInvalid = !data.id || !data.nome
        if (isInvalid)
            return false

        this.id = data.id
        this.nome = data.nome
        this.remove = data.remove

        return true
    }

    fromEntity(entity: FamiliaEntity) {
        this.id = entity.id
        this.nome = entity.nome
    }
}