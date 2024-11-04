import { PetI } from "@/utils/types/pets";
import Link from "next/link";

export function ItemPet({ data }: { data: PetI }) {
  return (
    <div className="max-w-sm bg-[#67AFB3] border border-gray-200 rounded-lg shadow">
      <Link href={`/detalhes/${data.id}`}>
        <img
          className="rounded-t-lg w-full h-64 object-cover"
          src={data.foto || '/placeholder-image.jpg'} // Imagem padrão caso 'data.foto' seja undefined
          alt={`Imagem do ${data.nome || 'Pet'}`}
        />
      </Link>
      <div className="p-5">
        <div className="flex items-center justify-center mb-3">
          <h5 className="text-2xl font-bold tracking-tight text-white">
            {data.nome}
          </h5>
          {data.sexo === 'MACHO' ? (
            <img className="w-6 h-6" src="./masculino.png" alt="" />
          ) : data.sexo === 'FEMEA' ? (
            <img className="w-6 h-6" src="./feminino.png" alt="" />
          ) : null}
        </div>
        <div className="mb-3 flex items-center text-white">
          Idade: {data.idade || 'N/A'} anos
        </div>
        <div className="mb-3 flex items-center text-white">
          Raça: {data.raca?.nome || 'Não especificada'}
        </div>
        <div className="mb-3 flex items-center text-white">
         Última consulta: {data.consultas && data.consultas.length > 0 ? data.consultas[0].createdAt.split('T')[0] : 'Nenhuma consulta anterior'}
        </div>
        <div className="flex justify-center mt-4">
          <Link href={`/detalhes/${data.id}`} className="inline-flex items-center px-3 py-2 text-md font-medium text-center text-[#67AFB3] bg-white rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300">
            Ver Detalhes
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
