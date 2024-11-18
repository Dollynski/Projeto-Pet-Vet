import { TutorI } from "@/utils/types/tutores"
import Link from "next/link"

function formatCPF(cpf: string): string {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export function ItemTutor({ data }: { data: TutorI }) {
    return (
        <>
        
<div className="flex flex-col justify-center m-auto w-[50%] mt-6" id="accordion-collapse" data-accordion="collapse">
  <h2 id="accordion-collapse-heading-1">
    <button onClick={() =>
                    document
                      .getElementById(data.id)
                      ?.classList.toggle("hidden")
                  } type="button" className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
      <span>{data.nome}</span>
      <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
      </svg>
    </button>
  </h2>
  <div id={data.id} className="hidden" aria-labelledby="accordion-collapse-heading-1">
    <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
      <p className="mb-2 text-center text-gray-500 dark:text-gray-400">
      <strong>Informações Adicionais</strong>
      </p>
      <p className="mb-2 text-gray-500 dark:text-gray-400">
        <strong>Contato:</strong> {data.telefone ? `${data.telefone} | ${data.email}` : data.email}
      </p>
      <p className="text-gray-500 dark:text-gray-400"><strong>CPF:</strong> {formatCPF(data.cpf)}</p>
      <p className="mb-2 text-gray-500 dark:text-gray-400"><strong>Endereço:</strong> {data.endereco}</p>
    </div>
  </div>
</div>
</>
    );  
}
