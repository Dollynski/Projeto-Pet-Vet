import { MarcaI } from "./marcas"

export interface CarroI {
  id: number
  modelo: string
  ano: number
  preco: number
  km: number
  destaque: boolean
  foto: string
  acessorios: string
  createdAt: Date
  updatedAt: Date
  combustivel: string
  marca: MarcaI
  marcaId: number
}