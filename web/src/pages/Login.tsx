import { useNavigate } from "react-router"

function Login() {
    const navigate = useNavigate()

    return (
        <>
            <h2>Login</h2>
            <button type="button" onClick={() => navigate("/cadastro")}>Cadastre-se</button>
        </>
    )
}

export default Login

