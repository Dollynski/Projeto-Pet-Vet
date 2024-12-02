"use client";
import { PetI } from "@/utils/types/pets";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useVeterinarioStore } from "@/context/veterinario";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';

type Inputs = {
  descricao: string;
};

export default function Detalhes() {
  const params = useParams();
  const { veterinario } = useVeterinarioStore();
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const [pet, setPet] = useState<PetI>();
  const [veterinarios, setVeterinarios] = useState<{ id: string, nome: string }[]>([]);
  const [tutores, setTutores] = useState<{ id: string, nome: string }[]>([]);

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/pets/${params.pet_id}`);
      const dados = await response.json();
      setPet(dados);
    }

    async function buscaVeterinarios() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/veterinarios`);
      const dados = await response.json();
      setVeterinarios(dados);
    }

    async function buscaTutores() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/tutores`);
      const dados = await response.json();
      setTutores(dados);
    }

    buscaDados();
    buscaVeterinarios();
    buscaTutores();
  }, [params.pet_id]);

  const exibirFormularioCadastroConsulta = () => {
    Swal.fire({
      title: '<h2 style="color: #ffffff; font-size: 1.2rem;">Cadastrar Consulta</h2>',
      html: `
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <label style="color: #ffffff; font-size: 0.8rem;">Tutor</label>
          <input type="text" id="tutorNome" class="swal2-input" style="background-color: #333333; color: #ffffff; font-size: 0.8rem;" value="${pet?.tutor.nome}" disabled>

          <label style="color: #ffffff; font-size: 0.8rem;">Pet</label>
          <input type="text" id="petNome" class="swal2-input" style="background-color: #333333; color: #ffffff; font-size: 0.8rem;" value="${pet?.nome}" disabled>

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
      preConfirm: async () => {
        const veterinarioId = (document.getElementById('veterinarioId') as HTMLSelectElement).value;
        const data = (document.getElementById('data') as HTMLInputElement).value;
        const horario = (document.getElementById('horario') as HTMLInputElement).value;
        const descricao = (document.getElementById('descricao') as HTMLTextAreaElement).value;

        const dataHora = new Date(`${data}T${horario}:00`);

        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/consultas`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tutorId: pet?.tutor.id,
            petId: pet?.id,
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
    <section className="flex mt-10 mx-auto flex-col items-center bg-[#67AFB3] border border-gray-200 rounded-lg shadow md:flex-row md:max-w-5xl hover:bg-[#77AFB1] dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <img
        className="object-cover w-full rounded-t-lg h-96 md:h-2/4 md:w-2/4 md:rounded-none md:rounded-s-lg"
        src={pet?.foto}
        alt="Foto do pet"
      />
      <div className="flex flex-col justify-between p-4 leading-normal text-white">
        <div className="flex items-center mb-3">
          <h5 className="text-2xl font-bold tracking-tight text-white">
            {pet?.nome}
          </h5>
          {pet?.sexo === 'MACHO' ? (
            <img className="w-6 h-6 ml-2" src="/masculino.png" alt="Ícone masculino" />
          ) : pet?.sexo === 'FEMEA' ? (
            <img className="w-6 h-6 ml-2" src="/feminino.png" alt="Ícone feminino" />
          ) : null}
        </div>
        <h5 className="mb-2 text-xl tracking-tight">
          <b>Raça:</b> {pet?.raca?.nome}
        </h5>
        <p className="mb-3 font-normal">
          <b>Tutor:</b> {pet?.tutor.nome}
        </p>
        <h5 className="mb-2 text-lg tracking-tight">
          <b>Idade:</b> {pet?.idade} anos
        </h5>
        <h5 className="mb-2 text-xl tracking-tight">
          <b>Peso:</b> {pet?.peso} kg
        </h5>
        <h5 className="mb-2 text-xl tracking-tight">
          <b>Sexo:</b> {pet?.sexo}
        </h5>
        <h5 className="mb-2 text-xl tracking-tight">
          <b>Consultas:</b> {pet?.consultas.length}
        </h5>

        {veterinario.id ? (
          <>
            <h3 className="text-xl font-bold tracking-tight">Aqui você marca uma consulta!</h3>
            <button onClick={exibirFormularioCadastroConsulta}
              className="mt-6 text-[#67AFB3] bg-white hover:white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Agendar uma consulta para {pet?.nome}
            </button>
          </>
        ) : (
          <h3 className="text-xl font-bold tracking-tight text-orange-700 dark:text-white">** Faça login para fazer a consulta deste pet</h3>
        )}
      </div>
    </section>
  );
}
