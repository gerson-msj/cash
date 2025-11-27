import { type MouseEvent } from "react"
import { useAppDispatch, useAppSelector } from "../hooks"
import { uiStateActions } from "../store/uiState"

interface MsgBoxProps {
    msgBoxKey: string
    title?: string
    message: string
    ok?: 'Ok' | 'Sim'
    cancel?: 'Cancelar' | 'Não'
    onConfirm?: () => void
    onCancel?: () => void
}

function MsgBox(props: MsgBoxProps) {

    const { msgBox } = useAppSelector(store => store.uiState)
    const dispatch = useAppDispatch()

    const onClickBox = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation()
    }

    const onOkClick = () => {
        props.onConfirm?.()
        dispatch(uiStateActions.ocultarMsgBox())
    }

    const onCancelClick = () => {
        props.onCancel?.()
        dispatch(uiStateActions.ocultarMsgBox())
    }

    return (
        <>
            {msgBox?.[props.msgBoxKey] && (
                <div className="msgbox back">
                    <div className="box" onClick={onClickBox}>
                        {props.title && <>
                            <h1>{props.title}</h1>
                        </>}
                        <p>{props.message}</p>
                        <div>
                            <button type="button" onClick={() => onOkClick()}>{props.ok ?? 'Ok'}</button>
                            {props.cancel && <>
                                <button type="button" onClick={() => onCancelClick()}>{props.cancel}</button>
                            </>}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default MsgBox