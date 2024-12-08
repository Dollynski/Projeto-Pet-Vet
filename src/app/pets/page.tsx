'use client'
import { InputPesquisa } from "@/components/InputPesquisa"
import { ItemPet } from "@/components/ItemPet";
import { PetI } from "@/utils/types/pets";
import { useEffect, useState } from "react";
import { Toaster } from 'sonner'
import { useVeterinarioStore } from "@/context/veterinario";
import Link from "next/link";
import Swal from 'sweetalert2'

export default function Home() {
  const [pets, setPets] = useState<PetI[]>([])
  const { logaVeterinario } = useVeterinarioStore()
  
  const [especies, setEspecies] = useState<{ id: string, nome: string }[]>([]);
  const [racas, setRacas] = useState<{ id: string, nome: string }[]>([]);
  const [tutores, setTutores] = useState<{ id: string, nome: string }[]>([]);

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
      setPets(dados)
    }
    buscaDados()
  }, [])

  useEffect(() => {
    async function fetchEspecies() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/especies`);
      const dados = await response.json();
      setEspecies(dados);
    }

    async function fetchRacas() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/racas`);
      const dados = await response.json();
      setRacas(dados);
    }

    async function fetchTutores() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/tutores`);
      const dados = await response.json();
      setTutores(dados);
    }

    fetchEspecies();
    fetchRacas();
    fetchTutores();
  }, []);

  const listaPets = pets.map(pet => (
    <ItemPet data={pet} key={pet.id} />
  ))

  // Função para exibir o formulário de cadastro de pet com SweetAlert2
  
  useEffect(() => {
    async function buscaRacas() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/racas`);
      const dados = await response.json();
      setRacas(dados);
    }
    buscaRacas();
  }, []);
  
    useEffect(() => {
      async function buscaTutores() {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/tutores`);
        const dados = await response.json();
        setTutores(dados);
      }
      buscaTutores();
    }, []);
  



  const exibirFormularioCadastroPet = () => {
    Swal.fire({
      title: '<h2 style="color: #ffffff; font-size: 1.2rem;">Cadastrar Pet</h2>',
      html: `
      <p style="color: #bbbbbb; font-size: 0.8rem; margin-bottom: 15px;">
        Preencha os dados para cadastrar o pet:
      </p>


      <div style="display: flex; flex-direction: column; gap: 10px; justify-content: center; align-items: center;">
        <label style="color: #ffffff; font-size: 0.8rem;">Foto</label>
        <input type="text" id="foto" class="swal2-input" placeholder="Endereço online da imagem" style="background-color: #333333; color: #ffffff; font-size: 0.8rem; padding: 5px; width: 100%;">

        <label style="color: #ffffff; font-size: 0.8rem;">Nome do Pet</label>
        <input type="text" id="nome" class="swal2-input" placeholder="Nome do Pet" style="background-color: #333333; color: #ffffff; font-size: 0.8rem; padding: 5px; width: 100%;">

        <label style="color: #ffffff; font-size: 0.8rem;">Peso atual</label>
        <input type="text" id="peso" class="swal2-input" placeholder="Peso atual" style="background-color: #333333; color: #ffffff; font-size: 0.8rem; padding: 5px; width: 100%;">
    
        <label style="color: #ffffff; font-size: 0.8rem;">Idade</label>
        <input type="text" id="idade" class="swal2-input" placeholder="Idade" style="background-color: #333333; color: #ffffff; font-size: 0.8rem; padding: 5px; width: 100%;">
        
        <label style="color: #ffffff; font-size: 0.8rem;">Data de Nascimento</label>
        <input type="date" id="dataNasc" class="swal2-input" placeholder="Data de Nascimento" style="background-color: #333333; color: #ffffff; font-size: 0.8rem; padding: 5px; width: 100%; color-scheme: dark;">

         <label style="color: #ffffff; font-size: 0.8rem;">Raça</label>
        <select id="racaId" class="swal2-input" style="background-color: #333333; color: #ffffff; font-size: 0.8rem; padding: 5px; width: 100%;">
          ${racas.map(raca => `<option value="${raca.id}">${raca.nome}</option>`).join('')}
        </select>

        <label style="color: #ffffff; font-size: 0.8rem;">Tutor</label>
        <select id="tutorId" class="swal2-input" style="background-color: #333333; color: #ffffff; font-size: 0.8rem; padding: 5px; width: 100%;">
          ${tutores.map(tutor => `<option value="${tutor.id}">${tutor.nome}</option>`).join('')}
        </select>

        <label style="color: #ffffff; font-size: 0.8rem;">Sexo do Pet</label>
        <select id="sexo" class="swal2-input" style="background-color: #333333; color: #ffffff; font-size: 0.8rem; padding: 5px; width: 100%;">
          <option value="MACHO">MACHO</option>
          <option value="FEMEA">FEMEA</option>
        </select>
      </div>
      `,
      confirmButtonText: 'CADASTRAR',
      confirmButtonColor: '#A4D0C3',
      background: '#1F1F1F',
      padding: '15px',
      width: '500px',
      preConfirm: async () => {
        const foto = (document.getElementById('foto') as HTMLInputElement).value;
        const nome = (document.getElementById('nome') as HTMLInputElement).value;
        const idade = (document.getElementById('idade') as HTMLInputElement).value;
        const racaId = (document.getElementById('racaId') as HTMLSelectElement).value;
        const tutorId = (document.getElementById('tutorId') as HTMLSelectElement).value;
        const peso = (document.getElementById('peso') as HTMLInputElement).value;
        const sexo = (document.getElementById('sexo') as HTMLSelectElement).value;
        const dataNasc = (document.getElementById('dataNasc') as HTMLInputElement).value;
        // Enviar dados para a API
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/pets`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            foto, nome, racaId: parseInt(racaId), idade: parseInt(idade), tutorId: parseInt(tutorId), peso: parseFloat(peso), sexo, dataNasc
          })
        });
        if (response.status === 201) {
          Swal.fire({
            icon: 'success',
            title: '<h2 style="color: #ffffff; font-size: 1.2rem;">Sucesso</h2>',
            text: 'Pet cadastrado com sucesso!',
            confirmButtonColor: '#A4D0C3',
            background: '#1F1F1F',
            padding: '15px',
            width: '500px',
          });
          const novoPet = await response.json();
          setPets(prevPets => [...prevPets, novoPet]);
        } else {
          Swal.fire({
            icon: 'error',
            title: '<h2 style="color: #ffffff; font-size: 1.2rem;">Erro</h2>',
            text: 'Erro ao cadastrar pet',
            confirmButtonColor: '#A4D0C3',
            background: '#1F1F1F',
            padding: '15px',
            width: '500px',
          });
        }
      }
    });
  };

  return (
    <main className="w-[84%] ml-auto">
      <div className="flex justify-between items-center px-4 py-5 sm:px-6">
        <Link href="/" className="text-gray-500 hover:text-gray-700 focus:outline-none focus:underline">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Voltar
        </Link>
        <button
          onClick={exibirFormularioCadastroPet}
          className="text-[#67AFB3] bg-transparent hover:bg-transparent focus:ring-4 focus:ring-[#67AFB3] font-medium rounded-lg text-sm px-5 py-2.5 text-center border border-[#67AFB3] hover:border-[#bdf4f7]"
        >
          + CADASTRAR PET
        </button>
      </div>
      <InputPesquisa setPets={setPets} />

      <section className="max-w-screen-x ml-20">
        <h1 className="mb-5 mt-2 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl">Pets <span className="underline underline-offset-3 decoration-8 decoration-[#67AFB3]">cadastrados</span></h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14">
          {listaPets}
        </div>
      </section>
      <Toaster position="top-right" richColors />
    </main>
  );
}
