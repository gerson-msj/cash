import type { ChangeEvent } from "react";
import type ICategoria from "../../domain/entities/categoria";
import { CategoriaTipos, categoriaTipoText, type CategoriaTipo } from "../../domain/entities/categoria";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { configActions } from "../../store/config";

export default function CategoriaEdit() {

    const dispatch = useAppDispatch()
    const { categoria } = useAppSelector(state => state.config)

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

    return categoria && (
        <div className="painel">
            <h3>Adicionar Categoria</h3>
            <form>
                <div>
                    <label>Categoria</label>
                    <input
                        type="text"
                        onChange={(e) => change("nome", e)}
                    />
                </div>
                <div>
                    <fieldset>
                        <legend>{categoria.categoriaTipo}</legend>
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
            </form>
        </div>
    )
}