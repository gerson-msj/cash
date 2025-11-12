import ModelBase from "./ModelBase";

export default class FamiliaModel extends ModelBase {
    nome: string = ''

    // constructor(data?: FamiliaEntity | string) {
    //     super();
    //     if(data instanceof FamiliaEntity)
    //         this.fromEntity(data)
    //     if(typeof data === 'string' && data.trim() !== '')
    //         this.fromBody(data)
    // }

    // fromBody(body: string) {
    //     const data = JSON.parse(body) as FamiliaModel
    //     this.id = data.id
    //     this.nome = data.nome
    //     this.remove = data.remove
    // }

    // fromEntity(entity: FamiliaEntity) {
    //     this.id = entity.id
    //     this.nome = entity.nome
    // }
}