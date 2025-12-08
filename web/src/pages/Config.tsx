import { useEffect } from "react"
import Categorias from "../components/config/Categorias"
import Contas from "../components/config/Contas"
import Familia from "../components/config/Familia"
import FamiliaEdit from "../components/config/FamiliaEdit"
import Integrante from "../components/config/Integrante"
import Integrantes from "../components/config/Integrantes"
import ButtonConfirm from "../components/ui/ButtonConfirm"
import { useAppDispatch, useAppSelector } from "../hooks"
import { configActions } from "../store/config"
import { uiStateActions } from "../store/uiState"
import "../styles/components/config-component.css"

function Config() {

    const saveKey = 'saveConfig'
    const dispatch = useAppDispatch()
    const { familia, familiaEdit } = useAppSelector(state => state.config)

    useEffect(() => {
        const disabled = familia.nome.trim() === '' || familiaEdit !== undefined
        dispatch(uiStateActions.buttonConfirmDisabled({ componentKey: saveKey, disabled }))
    }, [familia, familiaEdit, dispatch])

    useEffect(() => {
        dispatch(configActions.request())
    }, [dispatch])

    return (
        <div className="config-component">
            <div className="config-header">
                <h2>Configurações</h2>
                <ButtonConfirm
                    componentKey={saveKey}
                    text="Salvar"
                    message="Confirma a gravação das alterações?"
                    onConfirm={() => alert("Confirmou!")} />
            </div>
            <div className="config-body">
                <div className="painel p1">
                    <div className="painel p1-1">
                        <Familia />
                    </div>
                    <div className="painel p1-2">
                        <Integrantes />
                    </div>
                </div>
                {
                    !familiaEdit ? (
                        <div className="painel p2">
                            <div className="painel p2-1">
                                <Integrante />
                                <Categorias />
                                <Contas />
                            </div>
                            <div className="painel">
                                2.2
                            </div>
                            <div className="painel">
                                2.3
                            </div>
                        </div>
                    ) : (
                        <div className="painel p3">
                            <FamiliaEdit />
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Config