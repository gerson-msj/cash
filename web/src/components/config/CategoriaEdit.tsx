import type { ChangeEvent } from "react";
import type ICategoria from "../../domain/entities/categoria";
import { CategoriaTipos, categoriaTipoText, type CategoriaTipo } from "../../domain/entities/categoria";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { configActions, configContexts } from "../../store/config";
import ButtonConfirm from "../ui/ButtonConfirm";

export default function CategoriaEdit() {

    const dispatch = useAppDispatch()
    const { integrante, categoria } = useAppSelector(state => state.config)

    const checked = (value: CategoriaTipo) => categoria?.categoriaTipo === value

    const change = (name: keyof ICategoria, event: ChangeEvent<HTMLInputElement>) => {
        dispatch(configActions.categoria.alterar({
            name,
            value: event.currentTarget.value
        }))
    }

    const changeTipo = (value: CategoriaTipo) => {
        dispatch(configActions.categoria.alterar({
            name: "categoriaTipo",
            value
        }))
    }

    const okDisabled =
        categoria?.nome?.trim() === ''
        || integrante?.categorias?.some(c =>
            !c.remove
            && c.nome === categoria?.nome.trim()
            && c.categoriaTipo === categoria.categoriaTipo
        )

    const deleteMsg = categoria?.id !== undefined
        ? "Deseja excluir esta categoria e todos os lançamentos vinculados a ela?"
        : "Deseja excluir esta categoria?"


    return integrante && categoria && (
        <div className="painel">
            <h3>{`${categoria.ctx === configContexts.Criar ? 'Criar' : 'Editar'} Categoria`}</h3>
            <form className="form-left">
                <div className="field">
                    <label>Categoria</label>
                    <input
                        type="text"
                        onChange={(e) => change("nome", e)}
                        value={categoria.nome}
                    />
                </div>
                <div className="radio">
                    <fieldset>
                        <legend>Tipo</legend>
                        {
                            Object.entries<CategoriaTipo>(CategoriaTipos).map(([key, value]) => {
                                return (
                                    <div onClick={() => changeTipo(value)}>
                                        <input
                                            key={key}
                                            type="radio"
                                            name="tipo"
                                            value={value}
                                            checked={checked(value)}
                                        />
                                        <label>{categoriaTipoText[value]}</label>
                                    </div>
                                )
                            })
                        }
                    </fieldset>
                </div>
                <div className="button">
                    <button
                        type="button"
                        disabled={okDisabled}
                        onClick={() => dispatch(configActions.categoria.confirmar())}
                    >Ok</button>
                    <button
                        type="button"
                        onClick={() => dispatch(configActions.categoria.cancelar())}
                    >Cancelar</button>
                    {
                        categoria.ctx === configContexts.Editar && <ButtonConfirm
                            componentKey="excluirCategoria"
                            message={deleteMsg}
                            text="Excluir"
                            onConfirm={() => dispatch(configActions.categoria.excluir())}
                        />
                    }
                </div>
            </form>
        </div>
    )
}