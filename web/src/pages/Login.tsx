import { useNavigate } from "react-router"
import Aviso from "../components/Aviso"

function Login() {
    const navigate = useNavigate()

    const change = (name: keyof ICadastro, event: ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value
        dispatch(cadastroActions.change({ name, value }))
        dispatch(uiStateActions.ocultarAviso())
    }

    return (
        <>
            <h2>Login</h2>
            <form>
                <div>
                    <label>E-Mail</label>
                    <input type="text" onChange={(e) => change("email", e)} value={cadastro.email} />
                </div>
                <div>
                    <label>Senha</label>
                    <input type="password" onChange={(e) => change("senha", e)} value={cadastro.senha} />
                </div>
                <div>
                    <button type="button">Login</button>
                    <button type="button">Cadastre-se</button>
                </div>
            </form>
            <Aviso />
            <button type="button" onClick={() => navigate("/cadastro")}>Cadastre-se</button>
        </>
    )
}

export default Login

