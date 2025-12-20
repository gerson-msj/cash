import { useEffect } from "react"
import Categorias from "../components/config/Categorias"
import Contas from "../components/config/Contas"
import Familia from "../components/config/Familia"
import FamiliaEdit from "../components/config/FamiliaEdit"
import Integrante from "../components/config/Integrante"
import Integrantes from "../components/config/Integrantes"
import ButtonConfirm from "../components/ui/ButtonConfirm"
import { useAppDispatch, useAppSelector } from "../hooks"

import Aviso from "../components/Aviso"
import CategoriaEdit from "../components/config/CategoriaEdit"
import ContaEdit from "../components/config/ContaEdit"
import IntegranteEdit from "../components/config/IntegranteEdit"
import MsgBox from "../components/MsgBox"
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
        conta

    } = useAppSelector(state => state.config)

    const exibirIntegranteSelecionado =
        integrante?.ctx === configContexts.Selecionar

    const exibirIntegranteEdicao =
        integrante?.ctx === configContexts.Criar
        || integrante?.ctx === configContexts.Editar

    useEffect(() => {
        const disabled = familia.nome.trim() === ''
            || familiaEdit !== undefined
            || (integrante && integrante?.ctx !== configContexts.Selecionar)
            || categoria !== undefined
            || conta !== undefined

        dispatch(uiStateActions.buttonConfirmDisabled({ componentKey: saveKey, disabled }))
    }, [familia, familiaEdit, integrante, categoria, conta, dispatch])

    useEffect(() => {
        dispatch(configActions.request())
    }, [dispatch])

    return (
        <div className="config-main">
            <div className="config-header">
                <h2>Configurações</h2>
                <Aviso />
                <ButtonConfirm
                    componentKey={saveKey}
                    text="Salvar"
                    message="Confirma a gravação das alterações?"
                    onConfirm={() => dispatch(configActions.save())}
                />
                <MsgBox
                    componentKey="save"
                    message="Configurações persistidas com sucesso!"
                />
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
                                {conta && <ContaEdit />}
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
