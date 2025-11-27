import MsgBox from "../components/MsgBox"
import { useAppDispatch } from "../hooks"
import { uiStateActions } from "../store/uiState"

function Home() {

    const dispatch = useAppDispatch()

    return (
        <>
            <h2>Home</h2>
            <MsgBox msgBoxKey="a" key="a" title="Mensagem A" message="Atenção a A" />
            <MsgBox msgBoxKey="b" key="b" title="Mensagem B" message="Atenção a B" />
            <button type="button" onClick={() => dispatch(uiStateActions.exibirMsgBox({ msgBoxKey: 'a' }))}>Exibir A</button>
            <button type="button" onClick={() => dispatch(uiStateActions.exibirMsgBox({ msgBoxKey: 'b' }))}>Exibir B</button>
        </>
    )
}

export default Home