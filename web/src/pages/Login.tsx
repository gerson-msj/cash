import type { ChangeEvent } from "react"
import { useNavigate } from "react-router"
import Aviso from "../components/Aviso"
import type { ILogin } from "../domain/login"
import { useAppDispatch, useAppSelector } from "../hooks"
import { cadastroActions } from "../store/cadastro"
import { loginActions } from "../store/login"
import { uiStateActions } from "../store/uiState"

function Login() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { login } = useAppSelector(state => state.login)

    const change = (name: keyof ILogin, event: ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value
        dispatch(loginActions.change({ name, value }))
        dispatch(uiStateActions.ocultarAviso())
    }

    const doLogin = () => {
        dispatch(loginActions.login({ navigate }))
    }

    const cadastro = () => {
        dispatch(cadastroActions.change({ name: "email", value: login.email }))
        navigate('/cadstro')
    }

    return (
        <>
            <h2>Login</h2>
            <form>
                <div>
                    <label>E-Mail</label>
                    <input type="text" onChange={(e) => change("email", e)} value={login.email} />
                </div>
                <div>
                    <label>Senha</label>
                    <input type="password" onChange={(e) => change("senha", e)} value={login.senha} />
                </div>
                <div>
                    <button type="button" onClick={() => doLogin()}>Login</button>
                    <button type="button" onClick={() => cadastro()}>Cadastre-se</button>
                </div>
            </form>
            <Aviso />
        </>
    )
}

export default Login

