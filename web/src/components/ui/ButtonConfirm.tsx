import { useAppDispatch, useAppSelector } from "../../hooks"
import { uiStateActions } from "../../store/uiState"
import MsgBox from "../MsgBox"

interface IButtonConfirm {
    componentKey?: string
    text: string
    message: string
    onConfirm: () => void
}

export default function ButtonConfirm(props: IButtonConfirm) {

    const { buttonConfirmDisabled: disabled } = useAppSelector(store => store.uiState)
    const dispatch = useAppDispatch()

    const onClick = () => {
        dispatch(uiStateActions.exibirMsgBox({ componentKey: props.componentKey }))
    }

    return (
        <>
            <button
                type="button"
                onClick={() => onClick()}
                disabled={disabled?.[props.componentKey ?? 'default']}
            >{props.text}</button >
            <MsgBox
                msgBoxKey={props.componentKey}
                message={props.message}
                ok="Sim"
                cancel="Não"
                onConfirm={props.onConfirm} />
        </>
    )
}