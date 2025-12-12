import { useAppDispatch, useAppSelector } from "../../hooks"
import { configActions, configContexts } from "../../store/config"

export default function Integrante() {

    const dispatch = useAppDispatch()
    const { integrante } = useAppSelector(state => state.config)
    const { auth } = useAppSelector(state => state.auth)

    const podeEditar =
        auth?.principal || integrante?.id === auth?.idIntegrante

    const podeExibir =
        integrante?.ctx === configContexts.Selecionar
        && auth

    const definirItem = () => {
        const lnk = podeEditar ? ' lnk' : ''
        const selected = ''
        return `painel-item${lnk}${selected}`
    }

    const editarIntegrante = () => {
        if (podeEditar)
            dispatch(configActions.integrante.editar())
    }

    return (
        <div className="painel painel-lista">
            {
                podeExibir && (
                    <>
                        <div className="painel-header">
                            <h3>Integrante Selecionado</h3>
                        </div>
                        <div className="painel-body">
                            <div
                                className={definirItem()}
                                onClick={() => editarIntegrante()}
                            >
                                {integrante.nome}
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}