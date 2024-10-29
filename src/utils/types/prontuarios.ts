import { ConsultaI } from "./consultas"
import { VeterinarioI } from "./veterinarios"

export interface  ProntuarioI  {
    id: number
    descricao: string
    exame: string
    tratamento: string
    observacoes: string
    consulta: ConsultaI
    consultaId: number
    veterinario: VeterinarioI
    veterinarioId: number
}