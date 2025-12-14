import type ICategoria from "../../domain/entities/categoria"
import { categoriaText } from "../../domain/entities/categoria"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { configActions } from "../../store/config"

export default function Categorias() {

    const { integrante } = useAppSelector(state => state.config)
    const { auth } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    const podeEditar =
        auth?.principal || integrante?.id === auth?.idIntegrante

    const editar = (categoria: ICategoria, idx: number) => {
        if (podeEditar) {
            dispatch(configActions.categoria.editar({ categoria, idx }))
        }
    }

    return integrante && (
        <div className="painel painel-lista">
            <div className="painel-header">
                <h3>Categorias</h3>
                {
                    podeEditar && <button
                        type="button"
                        className="add"
                        onClick={() => dispatch(configActions.categoria.criar())}
                    >+</button>
                }
            </div>
            <div className="painel-body">
                {
                    integrante.categorias?.map((categoria, idx) => {
                        return !categoria.remove && (
                            <div
                                key={idx}
                                className={`painel-item ${podeEditar ? ' lnk' : ''}`}
                                onClick={() => editar(categoria, idx)}
                            >
                                {categoriaText(categoria)}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}