import type IIntegrante from "../../domain/entities/integrante"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { configActions, configContexts } from "../../store/config"

export default function Integrantes() {

    const dispatch = useAppDispatch()
    const { familia, integrante } = useAppSelector(state => state.config)
    const { principal } = useAppSelector(state => state.auth)


    const selecionarIntegrante = (integrante: IIntegrante, idx: number) => {
        dispatch(configActions.integrante.selecionar({ integrante, idx }))
    }

    const destacarIntegrante = (i: IIntegrante) => {
        const selected = integrante && integrante.ctx === configContexts.Selecionar && i.id === integrante.id
            ? ' selected'
            : ''
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
                        onClick={() => dispatch(configActions.integrante.novo())}
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
                                onClick={() => selecionarIntegrante(i, idx)}>
                                {i.nome}
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}
