"use client";
import { PetI } from "@/utils/types/pets"; // Certifique-se de que PetI está atualizado de acordo com seu novo modelo
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useVeterinarioStore } from "@/context/veterinario";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Inputs = {
  descricao: string;
};

export default function Detalhes() {
  const params = useParams();
  const { veterinario } = useVeterinarioStore();

  const [pet, setPet] = useState<PetI>();

  const { register, handleSubmit, reset } = useForm<Inputs>();

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/pets/${params.pet_id}`);
      const dados = await response.json();
      setPet(dados);
    }
    buscaDados();
  }, [params.pet_id]);

  async function enviaConsultas(data: Inputs) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/consultas`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        veterinarioId: veterinario.id,
        petId: Number(params.pet_id),
        descricao: data.descricao,
      }),
    });

    if (response.status === 201) {
      toast.success("Obrigado. Consulta efetuada com sucesso.");
      reset();
    } else {
      toast.error("Erro... Não foi possível completar sua consulta");
    }
  }

  return (
    <>
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
              <form onSubmit={handleSubmit(enviaConsultas)}>
                <input
                  type="text"
                  className="mb-2 mt-4 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={`${veterinario.nome} (${veterinario.email})`}
                  disabled
                  readOnly
                />
                <textarea
                  id="message"
                  className="mb-2 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Descreva a sua consulta"
                  required
                  {...register("descricao")}
                ></textarea>
                <button
                  type="submit"
                  className="text-[#67AFB3] bg-white hover:white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Agendar uma consulta para {pet?.nome}
                </button>
              </form>
            </>
          ) : (
            <h3 className="text-xl font-bold tracking-tight text-orange-700 dark:text-white">** Faça login para fazer a consulta deste pet</h3>
          )}
        </div>
      </section>
    </>
  );
}