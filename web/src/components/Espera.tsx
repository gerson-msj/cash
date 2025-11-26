import { useAppSelector } from "../hooks"

export function Espera() {

    const { espera } = useAppSelector(state => state.uiState)

    return (
        <>
            {
                espera && <div className="espera" />
            }
        </>
    )
}

export default Espera