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
