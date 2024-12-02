'use client'
import './page.css'
import { useEffect, useState } from "react";
import { useVeterinarioStore } from "@/context/veterinario";
import { ConsultaI } from "@/utils/types/consultas";
import { PetI } from "@/utils/types/pets";
import Link from 'next/link';
import Swal from 'sweetalert2';

export default function Consultas() {
  const [consultas, setConsultas] = useState<ConsultaI[]>([]);
  const [veterinarios, setVeterinarios] = useState<{ id: string, nome: string }[]>([]);
  const [pets, setPets] = useState<{ id: string, nome: string }[]>([]);
  const { veterinario } = useVeterinarioStore();
  const { logaVeterinario } = useVeterinarioStore();
  const [tutores, setTutores] = useState<{ id: string, nome: string }[]>([]);

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
        setConsultas(dados);
      } catch (error) {
        console.error("Erro ao buscar consultas:", error);
      }
    }

    async function buscaVeterinarios() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/veterinarios`);
      const dados = await response.json();
      setVeterinarios(dados);
    }

    async function buscaPets() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/pets`);
      const dados = await response.json();
      setPets(dados);
    }
    async function buscaTutores() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/tutores`);
      const dados = await response.json();
      setTutores(dados);
    }

    buscaDados();
    buscaTutores();
    buscaVeterinarios();
    buscaPets();

    const intervalId = setInterval(() => {
      buscaDados();
      buscaTutores();
      buscaVeterinarios();
      buscaPets();
    }, 5000); // Atualiza a cada 5 segundos

    return () => clearInterval(intervalId); // Limpa o intervalo quando o componente é desmontado
  }, [veterinario.id]);

  function dataDMA(data: string) {
    const ano = data.substring(0, 4);
    const mes = data.substring(5, 7);
    const dia = data.substring(8, 10);
    return dia + "/" + mes + "/" + ano;
  }

const exibirFormularioCadastroConsulta = () => {
  let petsFiltrados = [];

  Swal.fire({
    title: '<h2 style="color: #ffffff; font-size: 1.2rem;">Cadastrar Consulta</h2>',
    html: `
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <label style="color: #ffffff; font-size: 0.8rem;">Tutor</label>
        <select id="tutorId" class="swal2-input" style="background-color: #333333; color: #ffffff; font-size: 0.8rem;">
          <option value="">Selecione um tutor</option>
          ${tutores.map(tutor => `<option value="${tutor.id}">${tutor.nome}</option>`).join('')}
        </select>

        <label style="color: #ffffff; font-size: 0.8rem;">Pet</label>
        <select id="petId" class="swal2-input" style="background-color: #333333; color: #ffffff; font-size: 0.8rem;">
          <option value="">Nenhum pet disponível</option>
        </select>

        <label style="color: #ffffff; font-size: 0.8rem;">Veterinário</label>
        <select id="veterinarioId" class="swal2-input" style="background-color: #333333; color: #ffffff; font-size: 0.8rem;">
          ${veterinarios.map(vet => `<option value="${vet.id}">${vet.nome}</option>`).join('')}
        </select>

        <label style="color: #ffffff; font-size: 0.8rem;">Data da Consulta</label>
        <input type="date" id="data" class="swal2-input" style="background-color: #333333; color: #ffffff; font-size: 0.8rem;">

        <label style="color: #ffffff; font-size: 0.8rem;">Horário</label>
        <input type="time" id="horario" class="swal2-input" style="background-color: #333333; color: #ffffff; font-size: 0.8rem;">

        <label style="color: #ffffff; font-size: 0.8rem;">Descrição</label>
        <textarea id="descricao" class="swal2-input" placeholder="Descrição da consulta" style="background-color: #333333; color: #ffffff; font-size: 0.8rem; padding: 5px;"></textarea>
      </div>
    `,
    confirmButtonText: 'CADASTRAR',
    confirmButtonColor: '#A4D0C3',
    background: '#1F1F1F',
    didOpen: () => {
      const tutorSelect = document.getElementById('tutorId') as HTMLSelectElement;
      const petSelect = document.getElementById('petId') as HTMLSelectElement;

      tutorSelect.addEventListener('change', async () => {
        const tutorId = tutorSelect.value;
        
        if (tutorId) {
          try {
            // Fazer uma requisição para buscar os pets do tutor selecionado
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/tutores/${tutorId}/pets`);
            if (!response.ok) {
              throw new Error(`Erro na requisição: ${response.status}`);
            }

            petsFiltrados = await response.json();
            
            // Verifique no console se os pets estão sendo recebidos corretamente
            console.log('Pets do tutor:', petsFiltrados);

            // Atualizar o campo de seleção de pets com os pets do tutor selecionado
            petSelect.innerHTML = petsFiltrados.length > 0
              ? petsFiltrados.map((pet: PetI) => `<option value="${pet.id}">${pet.nome}</option>`).join('')
              : '<option value="">Nenhum pet disponível</option>';
          } catch (error) {
            console.error('Erro ao buscar pets:', error);
            petSelect.innerHTML = '<option value="">Erro ao carregar pets</option>';
          }
        } else {
          // Se nenhum tutor for selecionado, limpar a lista de pets
          petSelect.innerHTML = '<option value="">Nenhum pet disponível</option>';
        }
      });
    },
    preConfirm: async () => {
      const tutorId = (document.getElementById('tutorId') as HTMLSelectElement).value;
      const petId = (document.getElementById('petId') as HTMLSelectElement).value;
      const veterinarioId = (document.getElementById('veterinarioId') as HTMLSelectElement).value;
      const data = (document.getElementById('data') as HTMLInputElement).value;
      const horario = (document.getElementById('horario') as HTMLInputElement).value;
      const descricao = (document.getElementById('descricao') as HTMLTextAreaElement).value;

      const dataHora = new Date(`${data}T${horario}:00`);

      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/consultas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tutorId: parseInt(tutorId),
          petId: parseInt(petId),
          veterinarioId: parseInt(veterinarioId),
          data: dataHora,
          descricao
        })
      });

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: '<h2 style="color: #ffffff; font-size: 1.2rem;">Sucesso</h2>',
          text: 'Consulta cadastrada com sucesso!',
          confirmButtonColor: '#A4D0C3',
          background: '#1F1F1F',
        });
        const novaConsulta = await response.json();
        setConsultas(prevConsultas => [...prevConsultas, novaConsulta]);
      } else {
        Swal.fire({
          icon: 'error',
          title: '<h2 style="color: #ffffff; font-size: 1.2rem;">Erro</h2>',
          text: 'Erro ao cadastrar consulta',
          confirmButtonColor: '#A4D0C3',
          background: '#1F1F1F',
        });
      }
    }
  });
};

  
  return (
    <section className="w-[84%] ml-auto">
            <div className="flex justify-between items-center px-4 py-5 sm:px-6">
        <Link href="/" className="text-gray-500 hover:text-gray-700 focus:outline-none focus:underline">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Voltar
        </Link>
        <div className="flex justify-end">
        <button
          onClick={exibirFormularioCadastroConsulta}
          className="text-[#67AFB3] bg-transparent hover:bg-transparent focus:ring-1 focus:ring-[#67AFB3] font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 border border-[#67AFB3]"
        >
          + CONSULTA
        </button>
      </div>
      </div>
      <h1 className="flex justify-center align-center mb-6 mt-4 text-3xl font-extrabold leading-none tracking-tight text-black md:text-4xl lg:text-5xl dark:text-black">
      <span className="underline underline-offset-3 decoration-8 decoration-[#67AFB3] dark:decoration-[#67AFB3]"> Minhas consultas pendentes</span>
      </h1>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Nome do Pet</th>
            <th scope="col" className="px-6 py-3">Tutor</th>
            <th scope="col" className="px-6 py-3">Data</th>
            <th scope="col" className="px-6 py-3">Foto</th>
            <th scope="col" className="px-6 py-3">Descrição</th>
            <th scope="col" className="px-6 py-3">Ações</th>
          </tr>
        </thead>
        <tbody>
          {consultas.filter(consulta => consulta.status === "AGUARDANDO").map(consulta => (
            <tr key={consulta.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {consulta.pet.nome}
              </td>
              <td className="px-6 py-4">{consulta.tutor ? consulta.tutor.nome : 'Nome do tutor não disponível'}</td>
              <td className="px-6 py-4">
                <p>{dataDMA(consulta.data)}</p>
                <p><i>Horário: {new Date(consulta.data).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo' })}</i></p>
              </td>
              <td className="px-6 py-4">
              <img src={consulta.pet?.foto || 'foto_default.jpg'} alt="Foto do Pet" className="w-10 h-10 rounded-full" />
              </td>
              <td className="px-6 py-4">
                <p><b>{consulta.descricao}</b></p>
                <p><i>Consultado em: {dataDMA(consulta.data)}</i></p>
              </td>
                <td className="px-6 py-4 flex gap-2">
                <button
                onClick={() => {
                  (async () => {
                  const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/consultas/${consulta.id}/confirmar`, {
                  method: 'PATCH',
                  headers: { 'Content-Type': 'application/json' },
                  });
                  if (response.ok) {
                  const updatedConsulta = await response.json();
                  setConsultas(prevConsultas =>
                    prevConsultas.map(c => (c.id === updatedConsulta.id ? updatedConsulta : c))
                  );
                  Swal.fire({
                    icon: 'success',
                    title: '<h2 style="color: #ffffff; font-size: 1.2rem;">Sucesso</h2>',
                    text: 'Consulta confirmada com sucesso!',
                    confirmButtonColor: '#A4D0C3',
                    background: '#1F1F1F',
                  });
                  }
                  })();
                }}
                className="text-green-500 hover:text-green-700"
                >
                <img src="./concluir.png" alt="Confirmar" className="w-6 h-6" />
                </button>

                <button
                onClick={() => {
                  (async () => {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/consultas/${consulta.id}/deletar`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    });
                    if (response.ok) {
                    setConsultas(prevConsultas => prevConsultas.filter(c => c.id !== consulta.id));
                    Swal.fire({
                    icon: 'success',
                    title: '<h2 style="color: #ffffff; font-size: 1.2rem;">Sucesso</h2>',
                    text: 'Consulta deletada com sucesso!',
                    confirmButtonColor: '#A4D0C3',
                    background: '#1F1F1F',
                    });
                    }
                  })();
                }}
                className="text-red-500 hover:text-red-700"
                >
                <img src="./cancelar.png" alt="Deletar" className="w-6 h-6" />
                </button>

                <button
                onClick={async () => {
                  const { value: newDate } = await Swal.fire({
                    title: '<h2 style="color: #ffffff; font-size: 1.2rem;">Reagendamento de consulta</h2>',
                    html: `
                      <label style="color: #ffffff; font-size: 0.8rem;">Nova Data da Consulta</label>
                      <input type="date" id="newDate" class="swal2-input" style="background-color: #333333; color: #ffffff; font-size: 0.8rem;">
                    `,
                    confirmButtonText: 'REAGENDAR',
                    confirmButtonColor: '#A4D0C3',
                    background: '#1F1F1F',
                    preConfirm: () => {
                      const newDate = (document.getElementById('newDate') as HTMLInputElement).value;
                      if (!newDate) {
                        Swal.showValidationMessage('Por favor, selecione uma nova data');
                      }
                      return newDate;
                    }
                  });

                  if (newDate) {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/consultas/${consulta.id}/alterar`, {
                      method: 'PATCH',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ data: newDate })
                    });

                    if (response.ok) {
                      const updatedConsulta = await response.json();
                      setConsultas(prevConsultas =>
                        prevConsultas.map(c => (c.id === updatedConsulta.id ? updatedConsulta : c))
                      );
                      Swal.fire({
                        icon: 'success',
                        title: '<h2 style="color: #ffffff; font-size: 1.2rem;">Sucesso</h2>',
                        text: 'Consulta reagendada com sucesso!',
                        confirmButtonColor: '#A4D0C3',
                        background: '#1F1F1F',
                      });
                    } else {
                      Swal.fire({
                        icon: 'error',
                        title: '<h2 style="color: #ffffff; font-size: 1.2rem;">Erro</h2>',
                        text: 'Erro ao reagendar consulta',
                        confirmButtonColor: '#A4D0C3',
                        background: '#1F1F1F',
                      });
                    }
                  }
                }}
                className="text-yellow-500 hover:text-yellow-700"
                >
                <img src="./editar.png" alt="Alterar" className="w-6 h-6" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
