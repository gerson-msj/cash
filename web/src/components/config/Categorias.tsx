import { categoriaText } from "../../domain/entities/categoria"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { configActions } from "../../store/config"


export default function Categorias() {

    const { integrante } = useAppSelector(state => state.config)
    const { auth } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    const podeIncluir =
        auth?.principal || integrante?.id === auth?.idIntegrante

    return (
        <div className="painel painel-lista">
            <div className="painel-header">
                <h3>Categorias</h3>
                {
                    podeIncluir && <button
                        type="button"
                        className="add"
                        onClick={() => dispatch(configActions.categoria.criar())}
                    >+</button>
                }
            </div>
            <div className="painel-body">
                {
                    integrante?.categorias?.map((categoria, idx) => {
                        return (
                            <div
                                key={idx}
                                title={categoriaText(categoria)}
                            >
                                {categoria.nome}
                            </div>
                        )
                    })
                }
            </div>
        </div>

    )

}