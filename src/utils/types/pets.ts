import { TutorI } from "./tutores"
import { ConsultaI } from "./consultas"
import { RacaI } from "./racas"

export interface PetI {
  id: number
  nome: string
  dataNasc: string
  raca: RacaI
  racaId: number
  tutor: TutorI
  tutorId: number
  foto: string
  idade: number
  peso: number
  sexo: string
  consultas: ConsultaI[]
}