import { NavLink } from "react-router"

function Header() {
    return (
        <>
            <NavLink to="/">
                <h1>Cash</h1>
            </NavLink>
            <nav>
                <NavLink to="/config">
                    Configurações
                </NavLink>
            </nav>
        </>
    )
}

export default Header