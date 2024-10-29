"use client"
import { PetI } from "@/utils/types/pets";
import { FotoI } from "@/utils/types/fotos";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import { useClienteStore } from "@/context/cliente";
import { useForm } from "react-hook-form"
import { toast } from 'sonner'

type Inputs = {
  descricao: string
}

export default function Detalhes() {
  const params = useParams()
  const { cliente } = useClienteStore()

  const [pet, setPet] = useState<PetI>()
  const [fotos, setFotos] = useState<FotoI[]>([])

  const { register, handleSubmit, reset } = useForm<Inputs>()

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/pets/${params.pet_id}`)
      const dados = await response.json()
      // console.log(dados)
      setPet(dados)
    }
    buscaDados()

    async function buscaFotos() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/fotos/${params.pet_id}`)
      const dados = await response.json()
      setFotos(dados)
    }
    buscaFotos()
  }, [])

  const listaFotos = fotos.map(foto => (
    <div>
      <img className="h-auto max-w-80 rounded-lg"
        src={`data:image/jpg;base64, ${foto.codigoFoto}`}
        alt={foto.descricao}
        title={foto.descricao} />
    </div>
  ))

  async function enviaConsulta(data: Inputs) {

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/consultas`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        clienteId: cliente.id,
        petId: Number(params.pet_id),
        descricao: data.descricao
      })
    })

    if (response.status == 201) {
      toast.success("Obrigado. Sua consulta foi enviada. Aguarde retorno")
      reset()
    } else {
      toast.error("Erro... Não foi possível enviar sua consulta")
    }
  }

  return (
    <>
      <section className="flex mt-6 mx-auto flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-5xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img className="object-cover w-full rounded-t-lg h-96 md:h-2/4 md:w-2/4 md:rounded-none md:rounded-s-lg"
          src={pet?.foto} alt="Foto do Pet" />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {pet?.marca.nome} {pet?.modelo}
          </h5>
          <h5 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
            Ano: {pet?.ano} - {pet?.km.toLocaleString("pt-br")} km
          </h5>
          <h5 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
            Preço R$: {Number(pet?.preco)
              .toLocaleString("pt-br", { minimumFractionDigits: 2 })}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {pet?.acessorios}
          </p>

          {cliente.id ?
            <>
              <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Gostou deste Pet? Faça uma Consulta!</h3>
              <form onSubmit={handleSubmit(enviaConsulta)}>
                <input type="text" className="mb-2 mt-4 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={`${cliente.nome} (${cliente.email})`} disabled readOnly />
                <textarea id="message" className="mb-2 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  placeholder="Descreva a sua consulta" 
                  required
                  {...register("descricao")}></textarea>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Enviar Consulta</button>
              </form>
            </>
            :
            <h3 className="text-xl font-bold tracking-tight text-orange-700 dark:text-white">** Faça login para fazer consulta para este veículo</h3>
          }

        </div>
      </section>

      <div className="mt-4 md:max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
        {listaFotos}
      </div>

    </>
  )
}