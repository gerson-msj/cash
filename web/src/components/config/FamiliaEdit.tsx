import { useAppDispatch, useAppSelector } from "../../hooks"
import { configActions } from "../../store/config"

export default function FamiliaEdit() {

    const dispatch = useAppDispatch()
    const { familia, familiaEdit } = useAppSelector(state => state.config)

    const okDisabled =
        familia.nome === familiaEdit?.nome
        || (familiaEdit?.nome ?? '') === ''

    return familiaEdit && (
        <>
            <h3>Editar Família</h3>
            <form>
                <div>
                    <label>Nome</label>
                    <input
                        type="text"
                        value={familiaEdit.nome}
                        onChange={(e) => dispatch(configActions.alterarFamilia(e.currentTarget.value))}
                    />
                </div>
                <div>
                    <button
                        type="button"
                        disabled={okDisabled}
                        onClick={() => dispatch(configActions.confirmarFamilia())}
                    >Ok</button>
                    {/* O msgbox quebrou aqui!!! */}
                    {/* <ButtonConfirm
                        componentKey="familiaEditCancel"
                        message="Confirma o cancelamento da edição?"
                        text="Cancelar"
                        onConfirm={() => dispatch(configActions.cancelarFamilia())}
                    /> */}
                    <button
                        type="button"
                        onClick={() => dispatch(configActions.cancelarFamilia())}
                    >Cancelar</button>
                </div>
            </form>
        </>
    )
}