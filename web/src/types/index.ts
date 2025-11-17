export interface ICadastro {
    nome: string
    familia: string
    email: string
    senha: string
}

export const CadastroDefault: ICadastro = {
    nome: '',
    familia: '',
    email: '',
    senha: ''
}

export enum tipoAviso {
    sucesso,
    alerta,
    erro
}
export interface IAviso {

}