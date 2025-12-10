import type IIntegrante from "../../domain/entities/integrante"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { configActions } from "../../store/config"

export default function Integrantes() {

    const dispatch = useAppDispatch()
    const { familia, integrante } = useAppSelector(state => state.config)
    const { principal } = useAppSelector(state => state.auth)


    const selecionarIntegrante = (i: IIntegrante) => {
        dispatch(configActions.selecionarIntegrante(i))
    }

    const destacarIntegrante = (i: IIntegrante) => {
        const selected = integrante && i.id === integrante.id ? ' selected' : ''
        return `painel-item lnk${selected}`
    }

    return (
        <div className="painel painel-lista">

            <div className="painel-header">
                <h3>Integrantes</h3>
                {
                    principal && <button
                        type="button"
                        className="add"
                        onClick={() => dispatch(configActions.novoIntegrante())}
                    >+</button>
                }
            </div>

            <div className="painel-body">
                {
                    familia.integrantes?.map((i, idx) => {
                        return (
                            <div
                                key={idx}
                                className={destacarIntegrante(i)}
                                onClick={() => selecionarIntegrante(i)}>
                                {i.nome}
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}
