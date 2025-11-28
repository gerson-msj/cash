interface ILogin {
    email: string
    senha: string
}

const loginDefault: ILogin = {
    email: '',
    senha: ''
}

interface state {
    login: ILogin
}

const initialState: state = {
    login: loginDefault
}

const 

