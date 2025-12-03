import { useAppSelector } from "../../hooks"

export default function Familia() {

    const { familia } = useAppSelector(state => state.config)
    const { principal } = useAppSelector(state => state.auth)

    return (
        <>
            <h3>Família - {principal ? 'sim' : 'não'}</h3>
            <form>
                <div>
                    <input type="text" value={familia.nome} />
                </div>
            </form>
        </>
    )
}