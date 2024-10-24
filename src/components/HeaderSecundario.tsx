"use client"
import Link from "next/link";
import { useClienteStore } from "@/context/cliente";
import { useRouter } from "next/navigation";

export function HeaderSecundario() {
  const { cliente, deslogaCliente } = useClienteStore()
  const router = useRouter()

  function sairCliente() {
    deslogaCliente()
    // remove de localStorage o id do cliente logado (se ele indicou salvar no login)
    if (localStorage.getItem("client_key")) {
      localStorage.removeItem("client_key")
    }
    router.push("/login")
  }
return (
    <nav className="bg-[#1B1B1B] border-gray-200 dark:bg-gray-900 w-5/6 top-0 left-0 h-24 ">
        <div className="flex justify-between items-center mx-auto h-full px-4">
            <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
                <img src="./logo.webp" className="h-10" alt="Petvet" />
                <span className="self-center text-sm font-semibold whitespace-nowrap text-gray-300 dark:text-gray-300">
                    Seu pet, nossos cuidados
                </span>
            </Link>
            <div className="flex items-center space-x-6 rtl:space-x-reverse">
                {cliente.id ? (
                    <>
                        <div className="header_userInfo flex items-center space-x-4 rtl:space-x-reverse">
                            <div className="flex items-center space-x-1">
                                <img src="./perfil.png" alt="User Icon" className="w-8 h-8" />
                                <div className="flex flex-col">
                                    <span className="text-white">{cliente.nome}</span>
                                    <span className="text-gray-300">{cliente.id.slice(0, 10)}</span>
                                </div>
                            </div>
                            <button
                                id="dropdownMenuIconButton"
                                onClick={() => document.getElementById('dropdownDots')?.classList.toggle('hidden')}
                                className="inline-flex items-center p-2 text-sm font-medium text-center text-white bg-transparent rounded-lg hover:bg-gray-300 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                type="button"
                            >
                                <svg
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 4 15"
                                >
                                    <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                                </svg>
                            </button>
                            <div
                                id="dropdownDots"
                                className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                            >
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                            Configurações
                                        </a>
                                    </li>
                                </ul>
                                <div className="py-2">
                                    <a
                                        href="#"
                                        className="text-blue-600 dark:text-blue-500 hover:underline block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        onClick={sairCliente}
                                    >
                                        Sair
                                    </a>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <Link href="/login" className="font-bold text-blue-600 dark:text-blue-500 hover:underline">
                        Entrar
                    </Link>
                )}
            </div>
        </div>
    </nav>
    )
}