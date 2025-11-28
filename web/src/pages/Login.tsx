import { useEffect, type ChangeEvent } from "react"
import { useNavigate } from "react-router"
import Aviso from "../components/Aviso"
import { useAppDispatch, useAppSelector } from "../hooks"
import { loginActions, type ILogin } from "../store/login"
import { uiStateActions } from "../store/uiState"

function Login() {

    const { login } = useAppSelector(state => state.login)
    const { auth } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const change = (name: keyof ILogin, event: ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value
        dispatch(loginActions.change({ name, value }))
        dispatch(uiStateActions.ocultarAviso())
    }

    useEffect(() => {
        if (auth)
            navigate('/')
    }, [auth])

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
                    <button type="button">Login</button>
                    <button type="button" onClick={() => navigate("/cadastro")}>Cadastre-se</button>
                </div>
            </form>
            <Aviso />
        </>
    )
}

export default Login

