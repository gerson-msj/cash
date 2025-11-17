import type IAviso from "../domain/interfaces/IAviso"
import type { AvisoTipo } from "../domain/interfaces/IAviso"
import { useAppSelector } from "../hooks"

export default function Aviso() {

    const { aviso } = useAppSelector(state => state.aviso)

    const className = (tipo: AvisoTipo) => {
        return tipo == "SUCESSO" ? "sucesso" : tipo == "ALERTA" ? "alerta" : "erro"
    }

    const msg = (aviso: IAviso) => {
        const icon = aviso.tipo == "SUCESSO" ? "🟢" : aviso.tipo == "ALERTA" ? "🟠" : "🔴"
        return `${icon} ${aviso.mensagem}`
    }

    return (
        <>
            {
                aviso && (
                    <div className="aviso">
                        <div className={className(aviso.tipo)}>
                            {msg(aviso)}
                        </div>
                    </div>
                )
            }
        </>
    )
}