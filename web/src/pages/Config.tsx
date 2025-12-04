import Familia from "../components/config/Familia"
import Integrantes from "../components/config/Integrantes"
import ButtonConfirm from "../components/ui/ButtonConfirm"
import { useAppDispatch } from "../hooks"
import { configActions } from "../store/config"
import { uiStateActions } from "../store/uiState"
import "../styles/config.css"

function Config() {

    const dispatch = useAppDispatch()
    dispatch(configActions.request())
    dispatch(uiStateActions.buttonConfirmDisabled({ componentKey: 'confirm', disabled: false }))

    return (
        <div className="config">
            <div className="config-header">
                <h2>Configurações</h2>
                <ButtonConfirm
                    componentKey="confirm"
                    text="Salvar"
                    message="Confirma a gravação das alterações?"
                    onConfirm={() => alert("Confirmou!")} />
            </div>
            <div className="config-body">
                <Familia />
                <Integrantes />
            </div>
        </div>
    )
}

export default Config