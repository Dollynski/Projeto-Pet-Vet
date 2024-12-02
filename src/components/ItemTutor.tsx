import Swal from "sweetalert2";
import { TutorI } from "@/utils/types/tutores";

export function ItemTutor({ data }: { data: TutorI }) {


  async function deletarTutor(id: string) {
    const result = await Swal.fire({
      title: "<h2 style='color: #ffffff; font-size: 1.2rem;'>Deseja realmente apagar esse tutor da lista?</h2>",
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
        await fetch(`${process.env.NEXT_PUBLIC_URL_API}/tutores/${id}`, {
          method: "DELETE",
        });

        Swal.fire({
          icon: "success",
          title: "<h2 style='color: #ffffff; font-size: 1.2rem;'>Sucesso</h2>",
          text: "Tutor removido com sucesso!",
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
          text: "Ocorreu um problema ao tentar deletar o tutor.",
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
        text: "O tutor permanece na lista.",
        confirmButtonColor: "#A4D0C3",
        background: "#1F1F1F",
        padding: "15px",
        width: "500px",
      });
    }
  }

  async function editarTutor(id: string) {
    const { value: formValues } = await Swal.fire({
      title: '<h2 style="color: #ffffff; font-size: 1.2rem;">Editar Tutor</h2>',
      html: `
        <p style="color: #bbbbbb; font-size: 0.8rem; margin-bottom: 15px;">
          Preencha os dados para editar o tutor:
        </p>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <label style="color: #ffffff; font-size: 0.8rem;">Nome</label>
          <input type="text" id="nome" class="swal2-input" placeholder="Nome" style="background-color: #333333; color: #ffffff; font-size: 0.8rem; padding: 5px;">
          
          <label style="color: #ffffff; font-size: 0.8rem;">Email</label>
          <input type="email" id="email" class="swal2-input" placeholder="Email" style="background-color: #333333; color: #ffffff; font-size: 0.8rem; padding: 5px;">
  
          <label style="color: #ffffff; font-size: 0.8rem;">Senha</label>
          <input type="password" id="senha" class="swal2-input" placeholder="Senha" style="background-color: #333333; color: #ffffff; font-size: 0.8rem; padding: 5px;">
  
          <label style="color: #ffffff; font-size: 0.8rem;">CPF</label>
          <input type="text" id="cpf" class="swal2-input" placeholder="CPF" style="background-color: #333333; color: #ffffff; font-size: 0.8rem; padding: 5px;">
  
          <label style="color: #ffffff; font-size: 0.8rem;">Endereço</label>
          <input type="text" id="endereco" class="swal2-input" placeholder="Endereço" style="background-color: #333333; color: #ffffff; font-size: 0.8rem; padding: 5px;">
  
          <label style="color: #ffffff; font-size: 0.8rem;">Celular</label>
          <input type="text" id="celular" class="swal2-input" placeholder="Celular" style="background-color: #333333; color: #ffffff; font-size: 0.8rem; padding: 5px;">

          <h4 style="color: #bbbbbb; font-size: 0.6rem; margin-top: 12px;">*Favor, desconsiderar pontuação e caracteres especiais nos campos: CPF e CELULAR.</h4>
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
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const senha = (document.getElementById('senha') as HTMLInputElement).value;
        const cpf = (document.getElementById('cpf') as HTMLInputElement).value;
        const endereco = (document.getElementById('endereco') as HTMLInputElement).value;
        const celular = (document.getElementById('celular') as HTMLInputElement).value;

        if (cpf && cpf.length !== 11) {
          Swal.showValidationMessage("O CPF deve conter 11 dígitos.");
          return false;
        }
        if (celular && celular.length !== 11) {
          Swal.showValidationMessage("O celular deve conter 11 dígitos.");
          return false;
        }

        return { nome, email, senha, cpf, endereco, celular };
      }
    });

    if (formValues) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_URL_API}/tutores/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        });

        Swal.fire({
          icon: "success",
          title: "<h2 style='color: #ffffff; font-size: 1.2rem;'>Sucesso</h2>",
          text: "Tutor atualizado com sucesso!",
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
          text: "Ocorreu um problema ao tentar atualizar os dados do tutor.",
          confirmButtonColor: "#A4D0C3",
          background: "#1F1F1F",
          padding: "15px",
          width: "500px",
        });
      }
    }
  }

  function formatCPF(cpf: string): string {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  function formatCelular(celular: string): string {
    return celular.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }

  return (
    <>
      <div
        className="flex flex-col justify-center m-auto w-[50%] mt-6 mb-6"
        id="accordion-collapse"
        data-accordion="collapse"
      >

        <h2 id="accordion-collapse-heading-1">
<button
  onClick={() =>
    document.getElementById(data.id)?.classList.toggle("hidden")
  }
  type="button"
  className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-1 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3 relative"
  data-accordion-target="#accordion-collapse-body-1"
  aria-expanded="true"
  aria-controls="accordion-collapse-body-1"
>
  <div className="ml-4">
  <span className="before:absolute before:left-0 before:top-0 before:bottom-0 before:w-2 before:bg-[#67AFB3] before:rounded-l-lg before:rounded-b-none"></span>
  <span>{data.nome}</span>

  </div>
  <svg
    data-accordion-icon
    className="w-3 h-3 rotate-180 shrink-0"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 10 6"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 5 5 1 1 5"
    />
  </svg>
</button>
        </h2>
        <div
          id={data.id}
          className="hidden"
          aria-labelledby="accordion-collapse-heading-1"
        >
          <div className="p-5 border border-b-1 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
            <p className="mb-2 text-center text-gray-500 dark:text-gray-400">
            <div className="flex justify-end border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                <button
                  onClick={() => deletarTutor(data.id)}>
                  <img className="w-5 h-5 mr-2" src="./cancelar.png" alt="Icone de deletar" />
                </button>

                <button 
                 onClick={() => editarTutor(data.id)}>
                      <img className="w-5 h-5" src="./editar.png" alt="Icone de Editar" />
                </button>

              </div>
              <strong>Informações Adicionais</strong>

            </p>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              <strong>Contato:</strong>{" "}
              {data.celular
                ? `${formatCelular(data.celular)} | ${data.email}`
                : data.email}
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              <strong>CPF:</strong> {formatCPF(data.cpf)}
            </p>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              <strong>Endereço:</strong> {data.endereco}
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              <strong>Cadastrado em:</strong>{" "}
              {new Date(data.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
