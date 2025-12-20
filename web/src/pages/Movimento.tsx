import ButtonConfirm from "../components/ui/ButtonConfirm"
import { useAppDispatch } from "../hooks"
import { movimentoActions } from "../store/movimento"
import "../styles/pages/movimento-style.css"

export default function Movimento() {

    const dispatch = useAppDispatch()

    const saveKey = 'movimentoSave'



    return (
        <div className="movimento">
            <div className="header">
                <h2>Movimento</h2>
                <div className="datas">
                    {/* 
                    dezembro - 2025
                    usar storage para lembrar a última data selecionada
                    ao clicar, abrir popup para navegar
                    */}
                    Datas
                </div>
                <ButtonConfirm
                    componentKey={saveKey}
                    text="Salvar"
                    message="Confirma a gravação das alterações?"
                    onConfirm={() => dispatch(movimentoActions.save())}
                />
            </div>
            <div className="body">

            </div>
        </div>
    )
}