import { Link } from "react-router"
import { useAppDispatch, useAppSelector } from "../hooks"
import { loginActions } from "../store/login"

function Header() {

    const dispatch = useAppDispatch()
    const { auth } = useAppSelector(state => state.auth)

    return (
        <>
            <Link to="/">
                <h1>Cash</h1>
            </Link>
            <nav>
                <Link
                    to={auth ? '#' : '/login'}
                    onClick={(e) => {
                        if (auth) {
                            // alterar para questionar se deseja sair.
                            e.preventDefault()
                            dispatch(loginActions.logout())
                        }
                    }}>
                    {auth ? 'Sair' : 'Entrar'}
                </Link>
            </nav>
            <div className="line" />
        </>
    )
}

export default Header