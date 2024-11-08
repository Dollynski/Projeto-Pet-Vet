'use client'
import { ItemPet } from "@/components/ItemPet";
import { PetI } from "@/utils/types/pets";
import { useEffect, useState } from "react";
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
    <main className="min-h-screen flex flex-col items-center bg-gray-100 w-[84%] ml-auto bg-[url('/pata.png')] bg-center bg-no-repeat bg-[length:56%]">
<h1>Jose amaral</h1>
        
<button className="">
    <Link href="./pets">Ver pets</Link>
</button>
</main>

  );
}
