import Familia from "../components/config/Familia"
import Integrantes from "../components/config/Integrantes"
import "../styles/config.css"

function Config() {
    return (
        <div className="config">
            <div className="config-header">
                <h2>Configurações</h2>
                <button type="button">Salvar</button>
            </div>
            <div className="config-body">
                <Familia />
                <Integrantes />
            </div>
        </div>
    )
}

export default Config