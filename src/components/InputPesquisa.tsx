import { PetI } from "@/utils/types/pets"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

type Inputs = {
  termo: string
}

type InputPesquisaProps = {
  setPets: React.Dispatch<React.SetStateAction<PetI[]>>
}

export function InputPesquisa({ setPets }: InputPesquisaProps) {
  const { register, handleSubmit, reset } = useForm<Inputs>()

  async function enviaPesquisa(data: Inputs) {
    if (data.termo.length < 2) {
      toast.warning("Digite, no mínimo, 2 caracteres para realizar a pesquisa")
      return
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/pets/pesquisa/${data.termo}`)
    const dados = await response.json()
    if (dados.length == 0) {
      toast.error("Nenhum pet encontrado com o termo pesquisado")
      reset({ termo: "" })
      return
    }
    setPets(dados)
  }

  async function mostraDestaques() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/pets`)
    const dados = await response.json()
    setPets(dados)
    reset({ termo: "" })
  }

  return (
    <section className="flex max-w-5xl mx-auto mt-3">
      <form className="flex-1" onSubmit={handleSubmit(enviaPesquisa)}>
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Pesquisar</label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Digite o que você está procurando (Nome, Raça, Espécie, Sexo)"
            required
            {...register("termo")}
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Buscar
          </button>
        </div>
      </form>
      <button
        type="button"
        className="ms-3 mt-2 focus:outline-none text-white bg-[#67AFB3] hover:bg-[#7dbabd] focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
        onClick={mostraDestaques}
      >
        Ver Pets em Destaque
      </button>
    </section>
  )
}
