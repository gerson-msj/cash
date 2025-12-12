import type { ChangeEvent } from "react"
import type IIntegrante from "../../domain/entities/integrante"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { configActions } from "../../store/config"

export default function IntegranteAdd() {

    const dispatch = useAppDispatch()
    const { integranteAdd, familia } = useAppSelector(state => state.config)

    const change = (name: keyof IIntegrante, event: ChangeEvent<HTMLInputElement>) => {
        dispatch(configActions.alterar({
            name,
            value: event.currentTarget.value
        }))
    }

    const nome = integranteAdd?.nome.trim() ?? ''
    const email = integranteAdd?.email.trim() ?? ''
    const senha = integranteAdd?.senha?.trim() ?? ''
    const nomeEmUso = familia.integrantes?.some(i => i.nome.trim().toLowerCase() === nome.toLowerCase()) ?? false
    const emailEmUso = familia.integrantes?.some(i => i.email.trim().toLowerCase() === email.toLowerCase()) ?? false
    const okDisabled = nome === '' || email === '' || senha === '' || nomeEmUso || emailEmUso

    const confirmar = () => dispatch(configActions.confirmar())
    const cancelar = () => dispatch(configActions.cancelar())

    return integranteAdd && (
        <div className="painel">
            <h3>Adicionar Integrante</h3>
            <form className="form-left">
                <div className="field">
                    <label>Nome</label>
                    <input
                        type="text"
                        value={integranteAdd.nome}
                        onChange={(e) => change("nome", e)}
                    />
                </div>
                <div className="field">
                    <label>Email</label>
                    <input
                        type="email"
                        value={integranteAdd.email}
                        onChange={(e) => change("email", e)}
                    />
                </div>
                <div className="field">
                    <label>Senha</label>
                    <input
                        type="password"
                        value={integranteAdd.senha ?? ''}
                        onChange={(e) => change("senha", e)}
                    />
                </div>
                <div className="button">
                    <button type="button" disabled={okDisabled} onClick={() => confirmar()}>Ok</button>
                    <button type="button" onClick={() => cancelar()}>Cancelar</button>
                </div>
            </form>
        </div>
    )
}
