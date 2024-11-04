import { PetI } from "./pets"
import { TutorI } from "./tutores"
import { VeterinarioI } from "./veterinarios"
import { ProntuarioI } from "./prontuarios"

export interface ConsultaI {
    id: string
    data: string
    tutor: TutorI
    tutorId: number
    pet: PetI
    petId: number
    veterinario: VeterinarioI
    veterinarioId: number
    prontuarios: ProntuarioI[]
    status: string
    descricao: string
    createdAt: string
    updatedAt: string
}
