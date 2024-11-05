'use client'
import './page.css'
import { useEffect, useState } from "react";
import { useVeterinarioStore } from "@/context/veterinario";
import { ConsultaI } from "@/utils/types/consultas";
import { PetI } from "@/utils/types/pets";
import Link from 'next/link';

export default function Consultas() {
  const [consultas, setConsultas] = useState<ConsultaI[]>([]);
  const { veterinario } = useVeterinarioStore();
  const { logaVeterinario } = useVeterinarioStore();

  useEffect(() => {
    async function buscaVeterinario(idVeterinario: string) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/veterinarios/${idVeterinario}`);
      if (response.status === 200) {
        const dados = await response.json();
        logaVeterinario(dados);
      }
    }

    if (localStorage.getItem("client_key")) {
      const idVeterinarioLocal = localStorage.getItem("client_key") as string;
      buscaVeterinario(idVeterinarioLocal);
    }

    async function buscaDados() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/consultas/${veterinario.id}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const dados = await response.json();
        console.log(dados); // Para debugar
        setConsultas([dados]); // Colocando os dados em um array
      } catch (error) {
        console.error("Erro ao buscar consultas:", error);
      }
    }

    buscaDados();
  }, [veterinario.id]); // Adicionando veterinario.id como dependência

  // Para retornar apenas a data do campo no banco de dados
  // 2024-10-10T22:46:27.227Z => 10/10/2024
  function dataDMA(data: string) {
    const ano = data.substring(0, 4);
    const mes = data.substring(5, 7);
    const dia = data.substring(8, 10);
    return dia + "/" + mes + "/" + ano;
  }

  const consultasTable = consultas.map(consulta => (
    <tr key={consulta.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {consulta.petId} {/* Você pode precisar de uma chamada adicional para pegar as informações do pet, se necessário */}
      </th>
      <td className="px-6 py-4">
        {consulta.status} {/* Exibindo o nome do tutor */}
      </td>
      <td className="px-6 py-4">
        {/* Se tiver foto do pet, você deve fazer uma nova chamada para obter as informações do pet se não estiver incluída */}
        <img src={consulta.pet.foto} className="fotoPet" alt="Foto do pet" />
      </td>
      <td className="px-6 py-4">
        <p><b>{consulta.descricao}</b></p>
        <p><i>Consultado em: {dataDMA(consulta.createdAt)}</i></p>
      </td>
      <td className="px-6 py-4">
        <button className="bg-[#67AFB3] hover:bg-[#5CA1A3] text-white font-bold py-2 px-4 rounded">
          Ver detalhes
        </button>
      </td>
    </tr>
  ));

  return (
    <section className= "w-[84%] ml-auto">
      <h1 className="mb-6 mt-4 text-3xl font-extrabold leading-none tracking-tight text-black md:text-4xl lg:text-5xl dark:text-white">
        Listagem de <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">Minhas consultas</span>
      </h1>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Pet ID
            </th>
            <th scope="col" className="px-6 py-3">
              Nome do Tutor
            </th>
            <th scope="col" className="px-6 py-3">
              Foto do Pet
            </th>
            <th scope="col" className="px-6 py-3">
              Consulta
            </th>
            <th scope="col" className="px-6 py-3">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {consultasTable}
        </tbody>
      </table>
    </section>
  );
}
