'use client'
import { InputPesquisa } from "@/components/InputPesquisa"
import { useEffect, useState } from "react";
import { Toaster } from 'sonner'
import { useClienteStore } from "@/context/cliente";
import { ItemCarros } from "@/components/ItemCarros";
import { CarroI } from "@/utils/types/carros";
import Link from "next/link";

export default function Home() {
  const [carros, setCarros] = useState<CarroI[]>([]);
  const [cliente, setCliente] = useState<any>(null);
  const { logaCliente } = useClienteStore()

  useEffect(() => {
    async function buscaCliente(idCliente: string) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes/${idCliente}`)
      if (response.status == 200) {
        const dados = await response.json()
        logaCliente(dados)
        setCliente(dados)
      }
    }

    async function buscaDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/carros`)
      const dados = await response.json()
      setCarros(dados)
    }
    buscaDados()

    if (localStorage.getItem("client_key")) {
      const idClienteLocal = localStorage.getItem("client_key") as string
      buscaCliente(idClienteLocal)
    }
  }, [])

  const listaCarros = carros.map(carro => (
    <ItemCarros data={carro} key={carro.id} />
  ))

  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-100 w-[84%] ml-auto bg-[url('/pata.png')] bg-center bg-no-repeat bg-[length:64%]">
      <section className="text-center p-8 mt-24 ">
        {cliente && cliente.id ? (
          <>
            <div className="max-w-screen-xl mx-auto">
              <h1 className="text-4xl font-bold mb-4 text-[#3F3F3F]">
                Seja bem vindo, Dr. {cliente.nome}!
              </h1>
              <Toaster position="top-right" richColors />
            </div>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-4">
              Olá, seja bem-vindo à PetVet!
            </h1>
            <p className="text-lg mb-6">O que deseja fazer?</p>
            <div className="flex justify-center space-x-4">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                <Link href="/login">Fazer Login</Link>
              </button>
              <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                Conhecer sobre PetVet
              </button>
            </div>
          </>
        )}
      </section>
      <Toaster position="top-right" richColors />
    </main>
  );
}
