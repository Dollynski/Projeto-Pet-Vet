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

  const [racas, setRacas] = useState<{ id: string, nome: string }[]>([]);
  const exibirFormularioCadastroPet = () => {
    Swal.fire({
      title: '<h2 style="color: #ffffff; font-size: 1.2rem;">Cadastrar Pet</h2>',
      html: `
      <p style="color: #bbbbbb; font-size: 0.8rem; margin-bottom: 15px;">
        Preencha os dados para cadastrar o pet:
      </p>
      <div class="flex items-center justify-center w-full mb-4 mx-auto">
        <label for="dropzone-file" class="flex flex-col bg-transparent  items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-700">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
          <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
          </svg>
          <p class="mb-2 text-sm text-gray-500"><span class="font-semibold">Clique para fazer upload</span> ou arraste e solte</p>
          <p class="text-xs text-gray-500">SVG, PNG, JPG ou GIF (Res. MAX. 800x400px)</p>
        </div>
        <input id="dropzone-file" type="file" class="hidden" />
        </label>
      </div>

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

  useEffect(() => {
    async function buscaTutores() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/tutores`);
      const dados = await response.json();
      setTutores(dados);
    }
    buscaTutores();
  }, []);

  const [tutores, setTutores] = useState<{ id: string, nome: string }[]>([]);

  return (
    <main className="w-[84%] ml-auto bg-[url('/pata.png')] bg-center bg-no-repeat bg-[length:56%]">
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
        <h1 className="mb-5 mt-2 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl">Pets <span className="underline underline-offset-3 decoration-8 decoration-[#67AFB3]">em destaque</span></h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14">
          {listaPets}
        </div>
      </section>
      <Toaster position="top-right" richColors />
    </main>
  );
}
