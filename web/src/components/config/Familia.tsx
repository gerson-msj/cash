import { useAppDispatch, useAppSelector } from "../../hooks"
import { configActions } from "../../store/config"

export default function Familia() {

    const dispatch = useAppDispatch()
    const { familia } = useAppSelector(state => state.config)
    const { principal } = useAppSelector(state => state.auth)

    return (
        <>
            <h3>Família {!principal && familia.nome}</h3>
            <form>
                <div>
                    {
                        principal && <input
                            type="text"
                            value={familia.nome}
                            onChange={(e) => dispatch(configActions.alterarFamilia(e.currentTarget.value))} />
                    }
                </div>
            </form>
        </>
    )
}