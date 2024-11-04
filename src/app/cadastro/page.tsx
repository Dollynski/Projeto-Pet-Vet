"use client"

import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useVeterinarioStore } from "@/context/veterinario"
import { toast } from "sonner"

type Inputs = {
  nome: string
  email: string
  cnpj: string
  senha: string
}

export default function Cadastro() {
  const { register, handleSubmit } = useForm<Inputs>()
  const { logaVeterinario } = useVeterinarioStore()
  const router = useRouter()

  async function cadastraVeterinario(data: Inputs) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/veterinarios`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        nome: data.nome,
        email: data.email,
        cnpj: data.cnpj,
        senha: data.senha
      })
    })

    if (response.status == 201) {
      const dados = await response.json()
      toast.success("Olá " + dados.nome + ", cadastro realizado com sucesso!")
      localStorage.setItem("client_key", dados.id)
      logaVeterinario(dados)

      router.push("/")
    } else {
      const error = await response.json()
      toast.error("Erro no cadastro: " + error.erro)
    }
  }

  return (
    <section className="w-[84%] ml-auto">
      <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-[#222b36] rounded-2xl shadow-2xl dark:border md:mt-20 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-50 md:text-2xl dark:text-gray-900">
              Cadastre-se
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(cadastraVeterinario)}>
              <div>
                <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-50 dark:text-gray-900">Nome:</label>
                <input type="text" id="nome" className="bg-gray-700 border border-gray-400 text-gray-50 rounded-lg focus:ring-[#67AFB3] focus:border-[#67AFB3] block w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-900 dark:text-gray-900 dark:focus:ring-[#67AFB3] dark:focus:border-[#67AFB3]" placeholder="Nome completo" required {...register("nome")} />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-50 dark:text-gray-900">E-mail:</label>
                <input type="email" id="email" className="bg-gray-700 border border-gray-400 text-gray-50 rounded-lg focus:ring-[#67AFB3] focus:border-[#67AFB3] block w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-900 dark:text-gray-900 dark:focus:ring-[#67AFB3] dark:focus:border-[#67AFB3]" placeholder="name@company.com" required {...register("email")} />
              </div>
              <div>
                <label htmlFor="cnpj" className="block mb-2 text-sm font-medium text-gray-50 dark:text-gray-900">CNPJ:</label>
                <input type="text" id="cnpj" className="bg-gray-700 border border-gray-400 text-gray-50 rounded-lg focus:ring-[#67AFB3] focus:border-[#67AFB3] block w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-900 dark:text-gray-900 dark:focus:ring-[#67AFB3] dark:focus:border-[#67AFB3]" placeholder="00.000.000/0000-00" required {...register("cnpj")} />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-50 dark:text-gray-900">Senha:</label>
                <input type="password" id="password" placeholder="••••••••" className="bg-gray-700 border border-gray-400 text-gray-50 rounded-lg focus:ring-[#67AFB3] focus:border-[#67AFB3] block w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-900 dark:text-gray-900 dark:focus:ring-[#67AFB3] dark:focus:border-[#67AFB3]" required {...register("senha")} />
              </div>
              <button type="submit" className="w-full text-white bg-[#67AFB3] hover:bg-[#549A9E] focus:ring-4 focus:outline-none focus:ring-[#549A9E] font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#67AFB3] dark:hover:bg-[#549A9E] dark:focus:ring-[#5CABB0]">
                Cadastrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}