import { Link } from "react-router"
import { useAppDispatch, useAppSelector } from "../hooks"
import { loginActions } from "../store/login"
import { uiStateActions } from "../store/uiState"
import MsgBox from "./MsgBox"

function Header() {

    const dispatch = useAppDispatch()
    const { auth } = useAppSelector(state => state.auth)

    return (
        <>
            <Link to="/">
                <h1>Cash</h1>
            </Link>
            <nav>
                {
                    auth && (
                        <>
                            <Link to="/config">
                                Configurações
                            </Link>
                            {' | '}

                        </>
                    )
                }
                <Link
                    to={auth ? '#' : '/login'}
                    onClick={(e) => {
                        if (auth) {
                            e.preventDefault()
                            dispatch(uiStateActions.exibirMsgBox({}))
                        }
                    }}>
                    {auth ? 'Sair' : 'Entrar'}
                </Link>
            </nav>
            <div className="line" />
            <MsgBox
                message="Deseja realmente sair?"
                ok="Sim" cancel="Não"
                onConfirm={() => dispatch(loginActions.logout())}
            />
        </>
    )
}

export default Header