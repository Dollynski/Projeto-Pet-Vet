import { CarroI } from "./carros"

export interface PropostaI {
  id: number
  clienteId: string
  carroId: number
  carro: CarroI
  descricao: string
  resposta: string | null
  createdAt: string
  updatedAt: string | null
}