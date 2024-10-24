'use client'
import { InputPesquisa } from "@/components/InputPesquisa"
import { ItemCarros } from "@/components/ItemCarros";
import { CarroI } from "@/utils/types/carros";
import { useEffect, useState } from "react";
import { Toaster } from 'sonner'
import { useClienteStore } from "@/context/cliente";
import Link from 'next/link';

export default function Home() {
  const [carros, setCarros] = useState<CarroI[]>([])
  const { logaCliente } = useClienteStore()

  useEffect(() => {

    async function buscaCliente(idCliente: string) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes/${idCliente}`)
      if (response.status == 200) {
        const dados = await response.json()
        logaCliente(dados)
      }
    }

    if (localStorage.getItem("client_key")) {
      const idClienteLocal = localStorage.getItem("client_key") as string
      buscaCliente(idClienteLocal)
    }

    async function buscaDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/carros`)
      const dados = await response.json()
      // console.log(dados)
      setCarros(dados)
    }
    buscaDados()
  }, [])

  const listaCarros = carros.map( carro => (
    <ItemCarros data={carro} key={carro.id} />
  ))

  return (
    <main className="w-[84%] ml-auto">
          <div className="pet-card">
            <img src="https://via.placeholder.com/300x200" alt="Pet Image" className="pet-image"></img>
            <div className="pet-info">
                <h2 className="pet-name">Buddy</h2>
                <p className="pet-details">Age: 3 years, Breed: Golden Retriever</p>
                <p className="pet-details">Last Visit: 2022-01-01</p>
            </div>
            <button className="button">View More</button>
        </div>
    <script src="https://cdn.jsdelivr.net/npm/flowbite@1.5.3/dist/flowbite.min.js"></script>
    </main>
  );
}
