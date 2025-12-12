import type { ChangeEvent } from "react"
import type IIntegrante from "../../domain/entities/integrante"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { configActions, configContexts } from "../../store/config"

export default function IntegranteEdit() {

    const dispatch = useAppDispatch()
    const {
        integrante,
        familia
    } = useAppSelector(state => state.config)

    const change = (name: keyof IIntegrante, event: ChangeEvent<HTMLInputElement>) => {
        dispatch(configActions.integrante.alterar({
            name,
            value: event.currentTarget.value
        }))
    }

    const titulo =
        integrante?.ctx === configContexts.Criar ? 'Adicionar' : 'Editar'

    const nome = integrante?.nome.trim() ?? ''
    const email = integrante?.email.trim() ?? ''
    const senha = integrante?.senha?.trim() ?? ''
    const nomeEmUso = familia.integrantes?.some(i => i.nome.trim().toLowerCase() === nome.toLowerCase()) ?? false
    const emailEmUso = familia.integrantes?.some(i => i.email.trim().toLowerCase() === email.toLowerCase()) ?? false
    const okDisabled = nome === '' || email === '' || senha === '' || nomeEmUso || emailEmUso

    const confirmar = () => dispatch(configActions.integrante.confirmar())
    const cancelar = () => dispatch(configActions.integrante.cancelar())

    return integrante && (
        <div className="painel">
            <h3>{titulo} Integrante</h3>
            <form className="form-left">
                <div className="field">
                    <label>Nome</label>
                    <input
                        type="text"
                        value={integrante.nome}
                        onChange={(e) => change("nome", e)}
                    />
                </div>
                <div className="field">
                    <label>Email</label>
                    <input
                        type="email"
                        value={integrante.email}
                        onChange={(e) => change("email", e)}
                    />
                </div>
                <div className="field">
                    <label>Senha</label>
                    <input
                        type="password"
                        value={integrante.senha ?? ''}
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