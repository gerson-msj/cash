import type { ILogin } from "./login"

export interface ICadastro extends ILogin {
    nome: string
    familia: string
}

export const CadastroDefault: ICadastro = {
    nome: '',
    familia: '',
    email: '',
    senha: ''
}