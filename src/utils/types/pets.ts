import { TutorI } from "./tutores"
import { ConsultaI } from "./consultas"

export interface PetI {
  id: number
  nome: string
  dataNasc: string
  raca: string
  racaId: number
  tutor: TutorI
  tutorId: number
  foto: string
  consultas: ConsultaI[]
}