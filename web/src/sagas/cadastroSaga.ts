import { put, takeLatest } from "redux-saga/effects";
import { changeCadastro } from "../store/cadastroReducer";

export const cadastroPatterns = {
    teste: 'cadastro/teste'
}

function* teste() {
    yield put(changeCadastro)
}

export default function* cadastroSaga() {
    yield takeLatest(cadastroPatterns.teste, teste);
}