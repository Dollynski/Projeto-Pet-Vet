'use client'
import { ItemPet } from "@/components/ItemPet";
import { PetI } from "@/utils/types/pets";
import { useEffect, useState } from "react";
import { toast } from 'sonner';
import { useVeterinarioStore } from "@/context/veterinario";
import Link from 'next/link';

export default function Home() {
  const [pets, setPets] = useState<PetI[]>([]);
  const { logaVeterinario } = useVeterinarioStore();

  useEffect(() => {
    async function buscaVeterinario(idVeterinario: string) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/veterinarios/${idVeterinario}`);
      if (response.status == 200) {
        const dados = await response.json();
        logaVeterinario(dados);
      }
    }

    if (localStorage.getItem("client_key")) {
      const idVeterinarioLocal = localStorage.getItem("client_key") as string;
      buscaVeterinario(idVeterinarioLocal);
    }

    async function buscaDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/pets`);
      const dados = await response.json();
      setPets(dados);
    }
    buscaDados();
  }, []);

  const listaPets = pets.map(pet => (
    <ItemPet data={pet} key={pet.id} />
  ));

  async function buscaTutor(nome: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/tutores?nome=${nome}`);
    if (response.status === 200) {
      const dados = await response.json();
      if (dados.length > 0) {
        window.location.href = './tutores';
      } else {
        toast.error('Tutor não encontrado');
      }
    } else {
      toast.error('Erro ao buscar tutor');
    }
  }

  return (
    <main className="w-[84%] ml-auto">
      <div className="flex justify-between items-center px-4 py-5 sm:px-6">
        <Link href="/" className="text-gray-500 hover:text-gray-700 focus:outline-none focus:underline">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Voltar
        </Link>
        <div className="flex items-center">
          <input type="text" placeholder="Pesquisar tutor" className="border border-gray-300 rounded-md p-2" />
          <button onClick={() => buscaTutor('')} className="ml-2 bg-blue-500 text-white rounded-md p-2">Buscar</button>
        </div>
      </div>
    </main>
  );
}
