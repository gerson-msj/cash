import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { CadastroDefault, type ICadastro } from "../interfaces"

export interface CadastroState {
    cadastro: ICadastro
}

const initialState: CadastroState = {
    cadastro: CadastroDefault
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
    }
})

export const {
    changeCadastro
} = cadastroSlice.actions

const cadastroReducer = cadastroSlice.reducer
export default cadastroReducer