'use client'
import { InputPesquisa } from "@/components/InputPesquisa"
import { ItemPet } from "@/components/ItemPet";
import { PetI } from "@/utils/types/pets";
import { useEffect, useState } from "react";
import { Toaster } from 'sonner'
import { useVeterinarioStore } from "@/context/veterinario";
import Link from "next/link";
import { Chart } from "react-google-charts";

interface ConsultaVeterinarioI {
  veterinario: string;
  num: number;
}

interface GeralDadosI {
  consultas: number;
  veterinarios: number;
  pets: number;
}

type DataRow = [string, number, string];


export default function Home() {
  const [pets, setPets] = useState<PetI[]>([])
  const [veterinario, setVeterinario] = useState<any>(null);
  const [consultasVeterinario, setConsultasVeterinario] = useState<ConsultaVeterinarioI[]>([]);
  const [dados, setDados] = useState<GeralDadosI>({} as GeralDadosI);
  const { logaVeterinario } = useVeterinarioStore()

  useEffect(() => {
    async function buscaVeterinario(idVeterinario: string) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/veterinarios/${idVeterinario}`)
      if (response.status == 200) {
        const dados = await response.json()
        logaVeterinario(dados)
        setVeterinario(dados)
      }
    }

    if (localStorage.getItem("client_key")) {
      const idVeterinarioLocal = localStorage.getItem("client_key") as string
      buscaVeterinario(idVeterinarioLocal)
    }

    async function buscaDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/pets`)
      const dados = await response.json()
      setPets(dados)
    }
    buscaDados()

    async function getDadosGerais() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/dashboard/gerais`);
      const dados = await response.json();
      setDados(dados);
    }

    async function getDadosGrafico() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/dashboard/consultasVeterinario`);
      const dados = await response.json();
      setConsultasVeterinario(dados);
    }
    getDadosGerais();
    getDadosGrafico();
  }, [])


  const listaPets = pets.map(pet => (
    <ItemPet data={pet} key={pet.id} />
  ))

  const data: (["Veterinário", "Nº Consultas já confirmadas", { role: string }] | DataRow)[] = [
    ["Veterinário", "Nº Consultas já confirmadas", { role: "style" }],
  ];

  const cores = ["red", "blue", "violet", "green", "gold", "cyan", "chocolate", "purple", "brown", "orangered"];
  consultasVeterinario.forEach((consulta, index) => {
    data.push([consulta.veterinario, Number(consulta.num), cores[index % 10]]);
  });


  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-100 w-[84%] ml-auto bg-[url('/pata.png')] bg-center bg-no-repeat bg-[length:56%]">
      <section className="text-center p-8 mt-24 ">
        {veterinario && veterinario.id ? (
          <>
            <div className="max-w-screen-xl mx-auto">
              <h1 className="text-4xl font-bold mb-4 text-[#3F3F3F]">
                Seja bem vindo, Dr. {veterinario.nome}!
              </h1>
              <Toaster position="top-right" richColors />
            </div>

            <section className="container mt-24 flex flex-col">

              <div className="w-3/4 flex justify-between mx-auto mb-5">
                <div className="border-blue-600 border rounded p-6 w-1/3 me-3">
                  <span className="bg-blue-100 text-blue-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-blue-900 dark:text-blue-300">
                    {dados.veterinarios}
                  </span>
                  <p className="font-bold mt-2 text-center">Nº Veterinários</p>
                </div>
                <div className="border-red-600 border rounded p-6 w-1/3 me-3">
                  <span className="bg-red-100 text-red-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-red-900 dark:text-red-300">
                    {dados.consultas}
                  </span>
                  <p className="font-bold mt-2 text-center">Nº Consultas Pendentes</p>
                </div>
                <div className="border-green-600 border rounded p-6 w-1/3">
                  <span className="bg-green-100 text-green-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-green-900 dark:text-green-300">
                    {dados.pets}
                  </span>
                  <p className="font-bold mt-2 text-center">Nº Pets no Sistema</p>
                </div>
              </div>

                <h2 className="text-2xl font-bold mt-16 text-center">Gráfico: Nº de Consultas por Veterinário</h2>
                <div className="p-4 rounded-lg flex justify-center">
                <Chart
                  chartType="AreaChart" // Ou "BarChart" para um gráfico de barras
                  width="100%"
                  height="280px"
                  data={data}
                  options={{
                  legend: { position: "bottom", textStyle: { color: "#67AFB3" } },
                  hAxis: { textStyle: { color: "#67AFB3" } },
                  vAxis: { textStyle: { color: "#67AFB3" } },
                  colors: ["#67AFB3"],
                  }}
                />
                </div>
            </section>

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
