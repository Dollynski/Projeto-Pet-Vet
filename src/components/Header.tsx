"use client"
import Link from "next/link";
import { useClienteStore } from "@/context/cliente";
import { useRouter } from "next/navigation";

export function Header() {
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
    <nav className="bg-[#1B1B1B] border-gray-200 dark:bg-gray-900 h-full fixed left-0 top-0 w-[16%]">
      <div className="flex flex-col justify-between items-center mx-auto h-full">
        <Link
          href="/"
          className="flex flex-col items-center space-y-1 rtl:space-y-reverse mb-8 p-3 mt-4"
        >
          <img src="./logo.webp" className="h-auto w-auto" alt="Petvet" />
          <span className="self-center text-sm font-semibold whitespace-nowrap text-gray-300 dark:text-gray-300">
            Seu pet, nossos cuidados
          </span>
        </Link>
        <div className="flex flex-col items-center space-y-6 rtl:space-y-reverse w-full">
          {cliente.id ? (
            <>
              <div className="header_buttons flex justify-center w-full flex-col items-center p-1 space-y-6 mt-auto mb-auto">
                <Link
                  href="/pacientes"
                  className="font-bold text-white hover:underline text-sm w-5/6"
                >
                  <button className="flex items-center space-x-2 bg-[#67AFB3] text-white px-4 py-2 rounded-md hover:bg-[#7dbabd] w-full">
                    <img
                      src="./pacientes.png"
                      alt="Propostas"
                      className="w-7 h-7 bg-[#1B1B1B] rounded-lg p-0.5"
                    />
                    <span className="p-1">Pacientes</span>
                  </button>
                </Link>

                <Link
                  href="/propostas"
                  className="font-bold text-white hover:underline text-sm w-5/6"
                >
                  <button className="flex items-center space-x-2 bg-[#67AFB3] text-white px-4 py-2 rounded-md hover:bg-[#7dbabd] w-full">
                    <img
                      src="./consultas.png"
                      alt="Propostas"
                      className="w-7 h-7 bg-[#1B1B1B] rounded-lg p-0.5"
                    />
                    <span className="p-1">Consultas</span>
                  </button>
                </Link>

                <Link
                  href="/propostas"
                  className="font-bold text-white hover:underline text-sm w-5/6"
                >
                  <button className="flex items-center space-x-2 bg-[#67AFB3] text-white px-4 py-2 rounded-md hover:bg-[#7dbabd] w-full">
                    <img
                      src="./relatorios.png"
                      alt="Propostas"
                      className="w-7 h-7 bg-[#1B1B1B] rounded-lg p-0.5"
                    />
                    <span className="p-1">Relatórios</span>
                  </button>
                </Link>

                <Link
                  href="/pacientes"
                  className="font-bold text-white hover:underline text-sm w-5/6"
                >
                  <button className="flex items-center space-x-2 dark:bg-gray-900 text-white px-4 py-2 rounded-md w-full">
                    <span className="p-1"></span>
                  </button>
                </Link>

                <Link
                  href="/pacientes"
                  className="font-bold text-white hover:underline text-sm w-5/6"
                >
                  <button className="flex items-center space-x-2 dark:bg-gray-900 text-white px-4 py-2 rounded-md w-full">
                    <span className="p-1"></span>
                  </button>
                </Link>

                <Link
                  href="/pacientes"
                  className="font-bold text-white hover:underline text-sm w-5/6"
                >
                  <button className="flex items-center space-x-2 dark:bg-gray-900 text-white px-4 py-2 rounded-md w-full">
                    <span className="p-1"></span>
                  </button>
                </Link>

                <Link
                  href="/pacientes"
                  className="font-bold text-white hover:underline text-sm w-5/6"
                >
                  <button className="flex items-center space-x-2 dark:bg-gray-900 text-white px-4 py-2 rounded-md w-full">
                  </button>
                </Link>

                <Link
                  href="/pacientes"
                  className="font-bold text-white hover:underline text-sm w-5/6"
                >
                  <button className="flex items-center space-x-2 dark:bg-gray-900 text-white px-4 py-2 rounded-md w-full">
                  </button>
                </Link>

                <Link
                  href="/pacientes"
                  className="font-bold text-white hover:underline text-sm w-5/6"
                >
                  <button className="flex items-center space-x-2 dark:bg-gray-900 text-white px-4 py-2 rounded-md w-full">
                    <span className="p-1"></span>
                  </button>
                </Link>
              </div>

              <div className="header_userInfo bg-[#67AFB3] w-full flex items-center justify-between">
                <div className="flex items-center space-x-1 m-1">
                  <img
                    src="./perfil.png"
                    alt="User Icon"
                    className="w-8 h-8 ml-1"
                  />
                  <div className="flex flex-col p-1">
                    <span className="text-white">{cliente.nome}</span>
                    <span className="text-gray-300">
                      {cliente.id.slice(0, 10)}
                    </span>
                  </div>
                </div>
                <button
                  id="dropdownMenuIconButton"
                  onClick={() =>
                    document
                      .getElementById("dropdownDots")
                      ?.classList.toggle("hidden")
                  }
                  className="mr-1 inline-flex items-center p-2 text-sm font-medium text-center text-white bg-transparent rounded-lg hover:bg-gray-300 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownMenuIconButton"
                  >
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
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
            <>
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                <Link href="/login">Fazer Login</Link>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
