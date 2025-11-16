import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { CadastroDefault, type ICadastro } from "../../types"
import { cadastroActions } from "./actions"

interface CadastroState {
    cadastro: ICadastro,
    cadastrado: boolean
}

const initialState: CadastroState = {
    cadastro: CadastroDefault,
    cadastrado: false
}

const cadastroSlice = createSlice({
    name: "cadastro",
    initialState,
    reducers: {
        changeCadastro: <k extends keyof ICadastro>(
            state: CadastroState,
            action: PayloadAction<{
                name: k
                value: ICadastro[k]
            }>) => {
            const { name, value } = action.payload
            state.cadastro[name] = value
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(cadastroActions.saveSuccess, (state, action) => {
                state.cadastrado = action.payload != null
            })
    }
})

export default cadastroSlice