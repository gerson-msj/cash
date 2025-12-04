import { useEffect } from "react"
import Familia from "../components/config/Familia"
import Integrantes from "../components/config/Integrantes"
import ButtonConfirm from "../components/ui/ButtonConfirm"
import { useAppDispatch, useAppSelector } from "../hooks"
import { configActions } from "../store/config"
import { uiStateActions } from "../store/uiState"
import "../styles/config.css"

function Config() {

    const saveKey = 'saveConfig'
    const dispatch = useAppDispatch()
    const { familia } = useAppSelector(state => state.config)

    useEffect(() => {
        const disabled = familia.nome.trim() === ''
        dispatch(uiStateActions.buttonConfirmDisabled({ componentKey: saveKey, disabled }))
    }, [familia, dispatch])

    useEffect(() => {
        dispatch(configActions.request())
    }, [dispatch])

    return (
        <div className="config">
            <div className="config-header">
                <h2>Configurações</h2>
                <ButtonConfirm
                    componentKey={saveKey}
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