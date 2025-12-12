import { useAppDispatch, useAppSelector } from "../../hooks"
import { configActions } from "../../store/config"

export default function Familia() {

    const dispatch = useAppDispatch()
    const { familia, familiaEdit } = useAppSelector(state => state.config)
    const { principal } = useAppSelector(state => state.auth)

    const definirItem = () => {
        const lnk = principal ? ' lnk' : ''
        const selected = familiaEdit !== undefined ? ' selected' : ''
        return `painel-item${lnk}${selected}`
    }

    const selecionarItem = () => {
        if (!principal) return
        dispatch(configActions.familia.selecionar())
    }

    return (
        <div className="painel painel-lista">
            <div className="painel-header">
                <h3>Família</h3>
            </div>
            <div className="painel-body">
                <div
                    className={definirItem()}
                    onClick={() => selecionarItem()} >
                    {familia.nome}
                </div>
            </div>
        </div>
    )
}