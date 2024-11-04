'use client'
import { InputPesquisa } from "@/components/InputPesquisa"
import { ItemPet } from "@/components/ItemPet";
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
    <ItemPet data={pet} key={pet.id} />
  ))

  return (
    <main className="w-[84%] ml-auto">

    <div className="items-center px-4 py-5 mt-24 sm:px-6">      
      <h1 className="text-5xl font-bold text-center mb-4">Enviar um Relatório</h1>

      <p className="text-2xl font-semibold text-center mb-4">Escolha o arquivo em PDF a ser enviado para o tutor de pet</p>

    <div className="flex items-center justify-center w-[60%] mx-auto">
      <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
        </svg>
        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
      </div>
      <input id="dropzone-file" type="file" className="hidden" />
      </label>
    </div>    

    <div className="observacoes w-[60%] mx-auto">
      <label htmlFor="observacoes" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Observações</label>
      <textarea id="observacoes" name="observacoes" rows={3} className="mt-1 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md"></textarea>
    </div>

    <div className="escolha-o-destinatario w-[60%] mx-auto">
      <label htmlFor="destinatario" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Escolha o destinatário</label>
      <select id="destinatario" name="destinatario" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
        <option>Selecione</option>
        <option>Dr. Fulano</option>
        <option>Dr. Beltrano</option>
        <option>Dr. Ciclano</option>
      </select>
    </div>

    <div className="flex justify-center mt-8">
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Enviar dados</button>
    </div>

    </div>
    </main>
  );
}
