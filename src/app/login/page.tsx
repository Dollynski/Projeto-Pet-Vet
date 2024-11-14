"use client"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useVeterinarioStore } from "@/context/veterinario"

type Inputs = {
  email: string
  senha: string
  manter: boolean
}

export default function Login() {
  const { register, handleSubmit } = useForm<Inputs>()
  const { logaVeterinario } = useVeterinarioStore()
  const router = useRouter()

  async function verificaLogin(data: Inputs) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/veterinarios/login`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ email: data.email, senha: data.senha })  
    })
    if (response.status == 200) {
      const dados = await response.json()
      logaVeterinario(dados)
      if (data.manter) {
        localStorage.setItem("client_key", dados.id)
      } else {
        if (localStorage.getItem("client_key")) {
          localStorage.removeItem("client_key")
        }
      }     
      router.push("/")
    } else {
      alert("Erro... Login ou Senha incorretos")
    }
  }

  return (
    <section className="w-[84%] ml-auto ">
      <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-[#222b36] rounded-2xl shadow-2xl dark:border md:mt-20 sm:max-w-md xl:p-0 dark:bg-white dark:border-gray-300">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-50 md:text-2xl dark:text-gray-900">
              Informe seus Dados de Acesso
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(verificaLogin)}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-50 dark:text-gray-900">E-mail do Veterinario:</label>
                <input type="email" id="email" className="bg-gray-700 border border-gray-400 text-gray-50 rounded-lg focus:ring-[#67AFB3] focus:border-[#67AFB3] block w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 placeholder:placeholder-gray-400 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-[#67AFB3] dark:focus:border-[#67AFB3]" placeholder="seunome@endereco.com" required {...register("email")} />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-50 dark:text-gray-900">Senha de Acesso:</label>
                <input type="password" id="password" placeholder="••••••••" className="bg-gray-700 border border-gray-400 text-gray-50 rounded-lg focus:ring-[#67AFB3] focus:border-[#67AFB3] block w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 placeholder:placeholder-gray-400 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-[#67AFB3] dark:focus:border-[#67AFB3]" required {...register("senha")} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-400 rounded bg-gray-700 focus:ring-3 focus:ring-[#67AFB3] dark:bg-gray-50 dark:border-gray-300 dark:focus:ring-[#67AFB3] dark:ring-offset-gray-900" {...register("manter")} />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-50 dark:text-gray-900">
                      Manter Conectado
                    </label>
                  </div>
                </div>
                <a href="#" className="text-sm font-medium text-[#67AFB3] hover:underline dark:text-[#67AFB3]">Esqueceu sua senha?</a>
              </div>
              <button type="submit" className="w-full text-white bg-[#67AFB3] hover:bg-[#5CA1A3] focus:ring-4 focus:outline-none focus:ring-[#67AFB3] font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#67AFB3] dark:hover:bg-[#5CA1A3] dark:focus:ring-[#3C7A7D]">
                Entrar
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Você não está cadastrado? <a href="/cadastro" className="font-medium text-[#67AFB3] hover:underline dark:text-[#67AFB3]">Cadastre-se</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
