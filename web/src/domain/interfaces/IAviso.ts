export type AvisoTipo = 'SUCESSO' | 'ALERTA' | 'ERRO'

export default interface IAviso {
    origem?: string
    tipo: AvisoTipo
    mensagem: string
}