'use client'
import { ItemTutor } from "@/components/ItemTutor";
import { TutorI } from "@/utils/types/tutores";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { toast } from 'sonner';
import { useVeterinarioStore } from "@/context/veterinario";
import Link from 'next/link';
import Swal from 'sweetalert2';


type Inputs = {
  termo: string
}


export default function Home() {
  const [tutores, setTutores] = useState<TutorI[]>([]);
  const { logaVeterinario } = useVeterinarioStore();
  const { register, handleSubmit, reset } = useForm<Inputs>()

  useEffect(() => {
    const idVeterinarioLocal = localStorage.getItem("client_key") as string;
    if (idVeterinarioLocal) {
      buscarVeterinario(idVeterinarioLocal);
    }
    async function buscaTutores() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/tutores`)
      const dados = await response.json()
      setTutores(dados)
    }
    buscaTutores();
  }, []);

  const listaTutores = tutores.map(tutor => (
    <ItemTutor data={tutor} key={tutor.id} />
  ))




  async function buscarVeterinario(idVeterinario: string) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/veterinarios/${idVeterinario}`);
      if (response.ok) {
        const dados = await response.json();
        logaVeterinario(dados);
      }
    } catch {
      showError('Erro ao buscar dados do veterinário');
    }
  }

  function showError(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Erro',
      text: message,
    });
  }


  async function enviaPesquisa(data: Inputs) {
    if (data.termo.length < 2) {
      toast.warning("Digite, no mínimo, 2 caracteres para realizar a pesquisa")
      return
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/tutores/pesquisa/${data.termo}`)
    const dados = await response.json()
    if (dados.length == 0) {
      toast.error("Nenhum tutor encontrado com o termo pesquisado")
      reset({ termo: "" })
      return
    }
    setTutores(dados)
  }


  function exibirFormularioCadastroTutor() {
    Swal.fire({
      title: '<h2 style="color: #ffffff; font-size: 1.2rem;">Adicionar Responsável</h2>',
      html: `
        <p style="color: #bbbbbb; font-size: 0.8rem; margin-bottom: 15px;">
          Preencha os dados para cadastrar o responsável:
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
      confirmButtonText: 'CADASTRAR',
      confirmButtonColor: '#A4D0C3',
      background: '#1F1F1F',
      padding: '15px',
      width: '500px',
      preConfirm: () => {
        const nome = (document.getElementById('nome') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const senha = (document.getElementById('senha') as HTMLInputElement).value;
        const cpf = (document.getElementById('cpf') as HTMLInputElement).value;
        const endereco = (document.getElementById('endereco') as HTMLInputElement).value;
        const celular = (document.getElementById('celular') as HTMLInputElement).value;
  
        if (!nome || !email || !senha || !cpf || !endereco) {
          Swal.showValidationMessage('Por favor, preencha todos os campos obrigatórios');
          return;
        }

        if (cpf.length !== 11) {
          Swal.showValidationMessage('O CPF deve conter 11 dígitos');
          return;
        }

        if (celular.length !== 11) {
          Swal.showValidationMessage('O celular deve conter 11 dígitos');
          return;
        }

  
        return { nome, email, senha, cpf, endereco, celular };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        cadastrarResponsavel(result.value!);
      }
    });
  }
  

  async function cadastrarResponsavel(dadosResponsavel: {
    nome: string; email: string; senha: string; cpf: string; endereco: string; celular: string;
  }) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/tutores`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosResponsavel)
      });
      
      if (!response.ok) throw new Error();

      Swal.fire({
        icon: 'success',
        title: '<h2 style="color: #ffffff; font-size: 1.2rem;">Sucesso</h2>',
        text: 'Responsável cadastrado com sucesso!',
        confirmButtonColor: "#A4D0C3",
        background: "#1F1F1F",
        padding: "15px",
        width: "500px",
      });
    } catch {
      showError('Não foi possível cadastrar o responsável. Tente novamente.');
    }
  }

  async function mostraTodosTutores() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/tutores`)
    const dados = await response.json()
    setTutores(dados)
  }

  return (
    <main className="w-[84%] ml-auto">
      <div className="flex justify-between items-center px-4 py-5 sm:px-6">
        <Link href="/" className="text-gray-500 hover:text-gray-700 focus:outline-none focus:underline">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Voltar
        </Link>
        <button
          onClick={exibirFormularioCadastroTutor}
          className="text-[#67AFB3] bg-transparent hover:bg-transparent focus:ring-4 focus:ring-[#67AFB3] font-medium rounded-lg text-sm px-5 py-2.5 text-center border border-[#67AFB3] hover:border-[#bdf4f7]"
        >
          + RESPONSÁVEL
        </button>
      </div>

      <div className="container mx-auto mt-24">
        <h1 className="text-5xl font-bold text-center mb-4">Localizar Dono de Pets</h1>
        <div className="flex items-center mb-4 justify-center mt-28">
          <div className="relative w-1/2">
            <form onSubmit={handleSubmit(enviaPesquisa)}>
              <input type="search" id="search" className="block p-4 pl-12 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Digite aqui o nome do Tutor/Tutora do Pet" required {...register("termo")}/>
            </form>
            <div className="flex justify-center mt-4">
              <button
              type="button"
              className="focus:outline-none text-white bg-[#67AFB3] hover:bg-[#7dbabd] focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              onClick={mostraTodosTutores}
              >
              Ver Todos os Tutores
              </button>
            </div>
          </div>
        </div>
        <p className="text-sm text-center text-gray-500">Não achou o responsável? <span className="font-bold">Tente pelo e-mail ou celular.</span></p>
      </div>

      <h2 className="text-3xl text-center mt-20">Lista de tutores cadastrados</h2>
      {listaTutores}
    </main>
  );
}
