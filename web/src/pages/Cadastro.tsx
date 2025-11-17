import { useEffect, type ChangeEvent } from "react"
import Aviso from "../components/Aviso"
import { useAppDispatch, useAppSelector } from "../hooks"
import { avisoActions } from "../store/aviso"
import { cadastroActions } from "../store/cadastro"
import type { ICadastro } from "../types"

function Cadastro() {

    const { cadastro, cadastrado } = useAppSelector(state => state.cadastro)
    const dispatch = useAppDispatch()

    const change = (name: keyof ICadastro, event: ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value
        dispatch(cadastroActions.change({ name, value }))
        dispatch(avisoActions.remover())
    }

    const cadastrar = () => {
        dispatch(cadastroActions.save(cadastro))
    }

    useEffect(() => {
        if (cadastrado)
            alert("Cadastro realizado")

    }, [cadastrado])

    return (
        <>
            <h2>Cadastro</h2>
            <form>
                <div>
                    <label>Seu Nome</label>
                    <input type="text" onChange={(e) => change("nome", e)} value={cadastro.nome} />
                </div>
                <div>
                    <label>Nome da sua familia</label>
                    <input type="text" onChange={(e) => change("familia", e)} value={cadastro.familia} />
                </div>
                <div>
                    <label>E-Mail</label>
                    <input type="text" onChange={(e) => change("email", e)} value={cadastro.email} />
                </div>
                <div>
                    <label>Senha</label>
                    <input type="password" onChange={(e) => change("senha", e)} value={cadastro.senha} />
                </div>
                <div>
                    <button type="button" onClick={() => cadastrar()}>Cadastrar</button>
                </div>
            </form>
            <Aviso />
        </>
    )
}

export default Cadastro