import { useAppDispatch, useAppSelector } from "../../hooks"
import { configActions } from "../../store/config"

export default function FamiliaEdit() {

    const dispatch = useAppDispatch()
    const { familia, familiaEdit } = useAppSelector(state => state.config)

    const okDisabled =
        familia.nome === familiaEdit?.nome?.trim()
        || (familiaEdit?.nome?.trim() ?? '') === ''

    return familiaEdit && (
        <div className="painel">
            <h3>Editar Família</h3>
            <form className="form-left">
                <div className="field">
                    <label>Nome da família</label>
                    <input
                        type="text"
                        value={familiaEdit.nome}
                        onChange={(e) => dispatch(configActions.alterarFamilia(e.currentTarget.value))}
                    />
                </div>
                <div className="button">
                    <button
                        type="button"
                        disabled={okDisabled}
                        onClick={() => dispatch(configActions.confirmarFamilia())}
                    >Ok</button>
                    <button
                        type="button"
                        onClick={() => dispatch(configActions.cancelarFamilia())}
                    >Cancelar</button>
                </div>
            </form>
        </div>
    )
}