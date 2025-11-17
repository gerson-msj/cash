type AvisoTipo = 'SUCESSO' | 'ALERTA' | 'ERRO'

export default interface IAviso {
    tipo: AvisoTipo
    mensagem: string
    visivel: boolean
}