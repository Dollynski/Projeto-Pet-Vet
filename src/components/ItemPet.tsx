import { PetI } from "@/utils/types/pets";
import Link from "next/link";
import Swal from "sweetalert2";

export function ItemPet({ data }: { data: PetI }) {


  async function deletarPet(id: string) {
    const result = await Swal.fire({
      title: "<h2 style='color: #ffffff; font-size: 1.2rem;'>Deseja realmente apagar esse pet da lista?</h2>",
      text: "Essa ação não poderá ser desfeita!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "SIM, DELETAR",
      cancelButtonText: "NÃO, CANCELAR",
      confirmButtonColor: "#A4D0C3",
      cancelButtonColor: "#FF6F61",
      background: "#1F1F1F",
      reverseButtons: false,
      padding: "15px",
      width: "500px",
    });

    if (result.isConfirmed) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_URL_API}/pets/${id}`, {
          method: "DELETE",
        });

        Swal.fire({
          icon: "success",
          title: "<h2 style='color: #ffffff; font-size: 1.2rem;'>Sucesso</h2>",
          text: "Pet removido com sucesso!",
          confirmButtonColor: "#A4D0C3",
          background: "#1F1F1F",
          padding: "15px",
          width: "500px",
        });
        // Atualize a lista de tutores no estado principal, se necessário
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "<h2 style='color: #ffffff; font-size: 1.2rem;'>Erro</h2>",
          text: "Ocorreu um problema ao tentar deletar o pet.",
          confirmButtonColor: "#A4D0C3",
          background: "#1F1F1F",
          padding: "15px",
          width: "500px",
        });
      }
    } else {
      Swal.fire({
        icon: "info",
        title: "<h2 style='color: #ffffff; font-size: 1.2rem;'>Cancelado</h2>",
        text: "O Pet permanece na lista.",
        confirmButtonColor: "#A4D0C3",
        background: "#1F1F1F",
        padding: "15px",
        width: "500px",
      });
    }
  }
  async function editarPet(id: string) {
    const { value: formValues } = await Swal.fire({
      title: '<h2 style="color: #ffffff; font-size: 1.2rem;">Editar Tutor</h2>',
      html: `
         <p style="color: #bbbbbb; font-size: 0.8rem; margin-bottom: 15px;">
          Preencha os dados para editar o pet (pelo menos 1 campo é obrigatório):
        </p>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <label style="color: #ffffff; font-size: 0.8rem;">Nome</label>
          <input type="text" id="nome" class="swal2-input" placeholder="Nome" style="background-color: #333333; color: #ffffff; font-size: 0.8rem; padding: 5px;">
          
          <label style="color: #ffffff; font-size: 0.8rem;">Data de Nascimento</label>
          <input type="date" id="dataNasc" class="swal2-input" style="background-color: #333333; color: #ffffff; font-size: 0.8rem; padding: 5px;">
          
          <label style="color: #ffffff; font-size: 0.8rem;">Raça (ID)</label>
          <input type="number" id="racaId" class="swal2-input" placeholder="ID da raça" style="background-color: #333333; color: #ffffff; font-size: 0.8rem; padding: 5px;">
  
          <label style="color: #ffffff; font-size: 0.8rem;">Foto (URL)</label>
          <input type="text" id="foto" class="swal2-input" placeholder="URL da foto" style="background-color: #333333; color: #ffffff; font-size: 0.8rem; padding: 5px;">
          
          <label style="color: #ffffff; font-size: 0.8rem;">Idade</label>
          <input type="number" id="idade" class="swal2-input" placeholder="Idade em anos" style="background-color: #333333; color: #ffffff; font-size: 0.8rem; padding: 5px;">
          
          <label style="color: #ffffff; font-size: 0.8rem;">Peso (kg)</label>
          <input type="number" id="peso" class="swal2-input" placeholder="Peso em kg" style="background-color: #333333; color: #ffffff; font-size: 0.8rem; padding: 5px;">
          
          <label style="color: #ffffff; font-size: 0.8rem;">Sexo</label>
          <select id="sexo" class="swal2-input" style="background-color: #333333; color: #ffffff; font-size: 0.8rem; padding: 5px;">
            <option value="">Selecione</option>
            <option value="M">Macho</option>
            <option value="F">Fêmea</option>
          </select>
        </div>
      `,
      confirmButtonText: 'ATUALIZAR',
      confirmButtonColor: '#A4D0C3',
      cancelButtonText: 'CANCELAR',
      cancelButtonColor: '#FF6F61',
      background: '#1F1F1F',
      padding: '15px',
      width: '500px',
      showCancelButton: true,
      preConfirm: () => {
        const nome = (document.getElementById('nome') as HTMLInputElement).value;
        const dataNasc = (document.getElementById('dataNasc') as HTMLInputElement).value;
        const racaId = (document.getElementById('racaId') as HTMLInputElement).value;
        const foto = (document.getElementById('foto') as HTMLInputElement).value;
        const idade = (document.getElementById('idade') as HTMLInputElement).value;
        const peso = (document.getElementById('peso') as HTMLInputElement).value;
        const sexo = (document.getElementById('sexo') as HTMLSelectElement).value;
  
        
        const verificaCampoFormulario = [nome, dataNasc, racaId, foto, idade, peso, sexo].some(
          (value) => value.trim() !== ""
        );
  
        if (!verificaCampoFormulario) {
          Swal.showValidationMessage("Preencha pelo menos 1 campo para atualizar o pet.");
          return false;
        }
  
        return {
          ...(nome && { nome }),
          ...(dataNasc && { dataNasc }),
          ...(racaId && { racaId: parseInt(racaId) }),
          ...(foto && { foto }),
          ...(idade && { idade: parseInt(idade) }),
          ...(peso && { peso: parseFloat(peso) }),
          ...(sexo && { sexo }),
        };
      },
    });
  
    if (formValues) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_URL_API}/pets/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        });
  
        Swal.fire({
          icon: "success",
          title: "<h2 style='color: #ffffff; font-size: 1.2rem;'>Sucesso</h2>",
          text: "Pet atualizado com sucesso!",
          confirmButtonColor: "#A4D0C3",
          background: "#1F1F1F",
          padding: "15px",
          width: "500px",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "<h2 style='color: #ffffff; font-size: 1.2rem;'>Erro</h2>",
          text: "Ocorreu um problema ao tentar atualizar os dados do pet.",
          confirmButtonColor: "#A4D0C3",
          background: "#1F1F1F",
          padding: "15px",
          width: "500px",
        });
      }
    }
  }



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
          <h5 className="text-2xl font-bold tracking-tight text-white">{data.nome}</h5>
          {data.sexo === 'MACHO' ? (
            <img className="w-6 h-6 ml-2" src="./masculino.png" alt="Ícone Macho" />
          ) : data.sexo === 'FEMEA' ? (
            <img className="w-6 h-6 ml-2" src="./feminino.png" alt="Ícone Fêmea" />
          ) : null}
        </div>
  
      
        <div className="mb-3 flex items-center text-white">
          Idade: {data.idade || 'N/A'} anos
        </div>
        <div className="mb-3 flex items-center text-white">
          Raça: {data.raca?.nome || 'Não especificada'}
        </div>
        <div className="mb-3 flex items-center text-white">
          Última consulta:{' '}
          {data.consultas && data.consultas.length > 0
            ? data.consultas[0].createdAt.split('T')[0]
            : 'Nenhuma consulta anterior'}
        </div>
  
        
        <div className="flex justify-between items-center mt-4 gap-2">
         
          <button
            onClick={() => deletarPet(data.id.toString())}
            className="p-2  hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 dark:focus:ring-red-800"
          >
            <img className="w-5 h-5" src="./cancelar.png" alt="Ícone de Deletar" />
          </button>
  
          
          <button
            onClick={() => editarPet(data.id.toString())}
            className="p-2 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 dark:focus:ring-green-800"
          >
            <img className="w-5 h-5" src="./editar.png" alt="Ícone de Editar" />
          </button>
  
          
          <Link
            href={`/detalhes/${data.id}`}
            className="flex-1 inline-flex items-center justify-center px-3 py-2 text-md font-medium text-[#67AFB3] bg-white rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
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
