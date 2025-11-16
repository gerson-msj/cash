import { Link } from "react-router"

function Header() {
    return (
        <>
            <Link to="/">
                <h1>Cash</h1>
            </Link>
            <nav>
                <Link to="/login">
                    Entrar
                </Link>
            </nav>
            <hr />
        </>
    )
}

export default Header