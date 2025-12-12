import { useEffect } from "react"
import Categorias from "../components/config/Categorias"
import Contas from "../components/config/Contas"
import Familia from "../components/config/Familia"
import FamiliaEdit from "../components/config/FamiliaEdit"
import Integrante from "../components/config/Integrante"
import Integrantes from "../components/config/Integrantes"
import ButtonConfirm from "../components/ui/ButtonConfirm"
import { useAppDispatch, useAppSelector } from "../hooks"

import CategoriaEdit from "../components/config/CategoriaEdit"
import IntegranteEdit from "../components/config/IntegranteEdit"
import { configActions, configContexts } from "../store/config"
import { uiStateActions } from "../store/uiState"
import "../styles/pages/config-style.css"

function Config() {

    const saveKey = 'saveConfig'
    const dispatch = useAppDispatch()
    const {
        familia,
        familiaEdit,
        integrante,
        categoria,

    } = useAppSelector(state => state.config)

    const exibirIntegranteSelecionado =
        integrante?.ctx === configContexts.Selecionar

    const exibirIntegranteEdicao =
        integrante?.ctx === configContexts.Criar
        || integrante?.ctx === configContexts.Editar

    useEffect(() => {
        const disabled = familia.nome.trim() === '' || familiaEdit !== undefined || integrante !== undefined
        dispatch(uiStateActions.buttonConfirmDisabled({ componentKey: saveKey, disabled }))
    }, [familia, familiaEdit, integrante, dispatch])

    useEffect(() => {
        dispatch(configActions.request())
    }, [dispatch])

    return (
        <div className="config-main">
            <div className="config-header">
                <h2>Configurações</h2>
                <ButtonConfirm
                    componentKey={saveKey}
                    text="Salvar"
                    message="Confirma a gravação das alterações?"
                    onConfirm={() => alert("Confirmou!")} />
            </div>
            <div className="config-body">
                <div className="c1">
                    <Familia />
                    <Integrantes />
                </div>
                {familiaEdit && <FamiliaEdit />}
                {
                    exibirIntegranteSelecionado && (
                        <div className="c2">
                            <div className="c2-c1">
                                <Integrante />
                                <Categorias />
                                <Contas />
                            </div>
                            <div className="c2-c2">
                                {categoria && <CategoriaEdit />}
                            </div>
                        </div>
                    )
                }
                {exibirIntegranteEdicao && <IntegranteEdit />}
            </div>
        </div>
    )
}

export default Config
