'use client'
import { InputPesquisa } from "@/components/InputPesquisa"
import { ItemPets } from "@/components/ItemPets";
import { PetI } from "@/utils/types/pets";
import { useEffect, useState } from "react";
import { Toaster } from 'sonner'
import { useVeterinarioStore } from "@/context/veterinario";
import Link from 'next/link';

export default function Home() {
  const [pets, setPets] = useState<PetI[]>([])
  const { logaVeterinario } = useVeterinarioStore()

  useEffect(() => {

    async function buscaVeterinario(idVeterinario: string) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/veterinarios/${idVeterinario}`)
      if (response.status == 200) {
        const dados = await response.json()
        logaVeterinario(dados)
      }
    }

    if (localStorage.getItem("client_key")) {
      const idVeterinarioLocal = localStorage.getItem("client_key") as string
      buscaVeterinario(idVeterinarioLocal)
    }

    async function buscaDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/pets`)
      const dados = await response.json()
      // console.log(dados)
      setPets(dados)
    }
    buscaDados()
  }, [])

  const listaPets = pets.map( pet => (
    <ItemPets data={pet} key={pet.id} />
  ))

  return (
    <main className="w-[84%] ml-auto">
          <div className="flex justify-between items-center px-4 py-5 sm:px-6">
        <Link href="/" className="text-gray-500 hover:text-gray-700 focus:outline-none focus:underline">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
            Voltar
        </Link>
        <Link href="#" className="text-[#67AFB3] bg-transparent hover:bg-transparent focus:ring-4 focus:ring-[#67AFB3] font-medium rounded-lg text-sm px-5 py-2.5 text-center border border-[#67AFB3] hover:border-[#bdf4f7]">
            + RESPONSÁVEL
        </Link>
    </div>

    <div className="container mx-auto mt-24">
        <h1 className="text-5xl font-bold text-center mb-4">Localizar Dono de Pets</h1>
        <div className="flex items-center mb-4 justify-center mt-28">
            <div className="relative w-1/2">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Link href="./pets" className="text-gray-500">
                      <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"></svg>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4-4m0-6a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </Link>
  
                </div>
                <input type="search" id="search" className="block p-4 pl-12 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Digite aqui o nome do Tutor/Tutora do Pet"></input>
            </div>
        </div>
        <p className="text-sm text-center text-gray-500">Não achou o responsável? <span className="font-bold">Tente pelo e-mail ou telefone.</span></p>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/flowbite@1.5.3/dist/flowbite.min.js"></script>
    </main>
  );
}
