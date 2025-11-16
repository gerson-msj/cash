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