import { useAppDispatch, useAppSelector } from "../../hooks"
import { configActions } from "../../store/config"

export default function Integrante() {

    const dispatch = useAppDispatch()
    const { integrante } = useAppSelector(state => state.config)
    const { auth } = useAppSelector(state => state.auth)

    const podeEditar =
        auth?.principal || integrante?.id === auth?.idIntegrante

    const definirItem = () => {
        const lnk = podeEditar ? ' lnk' : ''
        const selected = ''
        return `painel-item${lnk}${selected}`
    }

    const editarIntegrante = () => {
        if (podeEditar)
            dispatch(configActions.editarIntegrante())
    }

    return (
        <div className="painel">
            {
                integrante && auth && (
                    <>
                        <div className="painel-header">
                            <h3>Integrante Selecionado</h3>
                        </div>
                        <div className="painel-lista">
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