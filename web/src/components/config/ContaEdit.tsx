import type { ChangeEvent } from "react";
import type IConta from "../../domain/entities/conta";
import { ContaTipos, contaTipoText, type ContaTipo } from "../../domain/entities/conta";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { configActions, configContexts } from "../../store/config";
import ButtonConfirm from "../ui/ButtonConfirm";

export default function ContaEdit() {

    const dispatch = useAppDispatch()
    const { integrante, conta } = useAppSelector(state => state.config)

    const checked = (value: ContaTipo) => conta?.contaTipo === value

    const change = (name: keyof IConta, event: ChangeEvent<HTMLInputElement>) => {
        dispatch(configActions.conta.alterar({
            name,
            value: event.currentTarget.value
        }))
    }

    const changeTipo = (value: ContaTipo) => {
        dispatch(configActions.conta.alterar({
            name: "contaTipo",
            value
        }))
    }

    const okDisabled =
        conta?.nome?.trim() === ''
        || (
            conta?.contaTipo === ContaTipos.Credito
            && (
                !conta.diaVencimentoCredito
                || (
                    conta.diaVencimentoCredito < 1
                    || conta.diaVencimentoCredito > 30
                )
            )
        )
        || integrante?.contas?.some(c =>
            !c.remove
            && c.nome === conta?.nome.trim()
            && c.contaTipo === conta.contaTipo
            && c.diaVencimentoCredito === conta.diaVencimentoCredito
        )

    const deleteMsg = conta?.id !== undefined
        ? "Deseja excluir esta conta e todos os lançamentos vinculados a ela?"
        : "Deseja excluir esta conta?"

    return integrante && conta && (
        <div className="painel">
            <h3>{`${conta.ctx === configContexts.Criar ? 'Criar' : 'Editar'} Conta`}</h3>
            <form className="form-left">
                <div className="field">
                    <label>Conta</label>
                    <input
                        type="text"
                        onChange={(e) => change("nome", e)}
                        value={conta.nome}
                    />
                </div>
                <div className="radio">
                    <fieldset>
                        <legend>Tipo</legend>
                        {
                            Object.entries<ContaTipo>(ContaTipos).map(([key, value]) => {
                                return (
                                    <div onClick={() => changeTipo(value)}>
                                        <input
                                            key={key}
                                            type="radio"
                                            name="tipo"
                                            value={value}
                                            checked={checked(value)}
                                        />
                                        <label>{contaTipoText[value]}</label>
                                    </div>
                                )
                            })
                        }
                    </fieldset>
                </div>
                {
                    conta.contaTipo === ContaTipos.Credito && <div className="field">
                        <label>Dia de Vencimento</label>
                        <input
                            type="number"
                            min={1}
                            max={30}
                            step={1}
                            onChange={(e) => change("diaVencimentoCredito", e)}
                            value={conta.diaVencimentoCredito}
                        />
                    </div>
                }
                <div className="button">
                    <button
                        type="button"
                        disabled={okDisabled}
                        onClick={() => dispatch(configActions.conta.confirmar())}
                    >Ok</button>
                    <button
                        type="button"
                        onClick={() => dispatch(configActions.conta.cancelar())}
                    >Cancelar</button>
                    {

                        conta.ctx === configContexts.Editar && <ButtonConfirm
                            componentKey="excluirConta"
                            message={deleteMsg}
                            text="Excluir"
                            onConfirm={() => dispatch(configActions.conta.excluir())}
                        />
                    }
                </div>
            </form>
        </div>
    )
}