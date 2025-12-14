import type IConta from "../../domain/entities/conta"
import { contaText } from "../../domain/entities/conta"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { configActions } from "../../store/config"

export default function Contas() {

    const { integrante } = useAppSelector(state => state.config)
    const { auth } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    const podeEditar =
        auth?.principal || integrante?.id === auth?.idIntegrante

    const editar = (conta: IConta, idx: number) => {
        if (podeEditar) {
            dispatch(configActions.conta.editar({ conta: conta, idx }))
        }
    }

    return (
        <div className="painel painel-lista">
            <div className="painel-header">
                <h3>Contas</h3>
                {
                    podeEditar && <button
                        type="button"
                        className="add"
                        onClick={() => dispatch(configActions.conta.criar())}
                    >+</button>
                }
            </div>
            <div className="painel-body">
                {
                    integrante?.contas?.map((conta, idx) => {
                        return !conta.remove && (
                            <div
                                key={idx}
                                className={`painel-item ${podeEditar ? ' lnk' : ''}`}
                                onClick={() => editar(conta, idx)}
                            >
                                {contaText(conta)}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}