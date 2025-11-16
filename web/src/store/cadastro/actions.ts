import { createAction } from "@reduxjs/toolkit";
import type { ICadastro } from "../../types";
import cadastroSlice from "./slice";

export const cadastroTypes = {
    request: 'cadastro/request',
    success: 'cadastro/success',
    error: 'cadastro/error'
}

export const cadastroActions = {
    change: cadastroSlice.actions.changeCadastro,
    save: createAction<ICadastro>(cadastroTypes.request),
    saveSuccess: createAction<ICadastro>(cadastroTypes.success),
    saveError: createAction(cadastroTypes.error)
}
