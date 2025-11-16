import { NavLink } from "react-router-dom"
import "./config.css"

function Config() {
    return (
        <div className="config">
            <div className="header">
                <h2>Configurações</h2>
                <nav>
                    <NavLink to="/config/familia">Familia</NavLink>
                    <NavLink to="/config/integrantes">Integrantes</NavLink>
                </nav>
            </div>
        </div>
    )
}

export default Config