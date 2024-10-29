import { PrismaClient } from "@prisma/client"
import { Router } from "express"
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()
const router = Router()

router.get("/", async (req, res) => {
  try {
    const veterinarios = await prisma.veterinario.findMany({
      include: {
        consultas: true,
        prontuarios: true
      }
    })
    res.status(200).json(veterinarios)
  } catch (error) {
    res.status(400).json(error)
  }
})

function validaSenha(senha: string) {

  const mensa: string[] = []

  // .length: retorna o tamanho da string (da senha)
  if (senha.length < 8) {
    mensa.push("Erro... senha deve possuir, no mínimo, 8 caracteres")
  }

  // contadores
  let pequenas = 0
  let grandes = 0
  let numeros = 0
  let simbolos = 0

  // senha = "abc123"
  // letra = "a"

  // percorre as letras da variável senha
  for (const letra of senha) {
    // expressão regular
    if ((/[a-z]/).test(letra)) {
      pequenas++
    }
    else if ((/[A-Z]/).test(letra)) {
      grandes++
    }
    else if ((/[0-9]/).test(letra)) {
      numeros++
    } else {
      simbolos++
    }
  }

  if (pequenas == 0 || grandes == 0 || numeros == 0 || simbolos == 0) {
    mensa.push("Erro... senha deve possuir letras minúsculas, maiúsculas, números e símbolos")
  }

  return mensa
}

router.post("/", async (req, res) => {
  const { nome, email, senha, cnpj } = req.body

  if (!nome || !email || !senha || !cnpj) {
    res.status(400).json({ erro: "Informe nome, cnpj, email e senha" })
    return
  }

  const erros = validaSenha(senha)
  if (erros.length > 0) {
    res.status(400).json({ erro: erros.join("; ") })
    return
  }

  // 12 é o número de voltas (repetições) que o algoritmo faz
  // para gerar o salt (sal/tempero)
  const salt = bcrypt.genSaltSync(12)
  // gera o hash da senha acrescida do salt
  const hash = bcrypt.hashSync(senha, salt)

  // para o campo senha, atribui o hash gerado
  try {
    const veterinario = await prisma.veterinario.create({
      data: { nome, email, senha: hash, cnpj }
    })
    res.status(201).json(veterinario)
  } catch (error) {
    res.status(400).json(error)
  }
})



router.post("/login", async (req, res) => {
  const { email, senha } = req.body

  // em termos de segurança, o recomendado é exibir uma mensagem padrão
  // a fim de evitar de dar "dicas" sobre o processo de login para hackers
  const mensaPadrao = "Login ou senha incorretos"

  if (!email || !senha) {
    // res.status(400).json({ erro: "Informe e-mail e senha" })
    res.status(400).json({ erro: mensaPadrao })
    return
  }

  try {
    const veterinario = await prisma.veterinario.findUnique({
      where: { email }
    })

    if (veterinario == null) {
      // res.status(400).json({ erro: "E-mail inválido" })
      res.status(400).json({ erro: mensaPadrao })
      return
    }

    // se o e-mail existe, faz-se a comparação dos hashs
    if (bcrypt.compareSync(senha, veterinario.senha)) {
      res.status(200).json({
        id: veterinario.id,
        nome: veterinario.nome,
        email: veterinario.email
      })
    } else {
      // res.status(400).json({ erro: "Senha incorreta" })

      res.status(400).json({ erro: mensaPadrao })
    }
  } catch (error) {
    res.status(400).json(error)
  }
})


router.get("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const veterinario = await prisma.veterinario.findUnique({
      where: { id: Number(id) },
      include: {
        consultas: true,
        prontuarios: true
      }
    })

    if (veterinario == null) {
      res.status(400).json({ erro: "Veterinário não cadastrado" })
    } else {
      res.status(200).json({
        id: veterinario.id,
        nome: veterinario.nome,
        email: veterinario.email,
        cnpj: veterinario.cnpj,
        celular: veterinario.celular,
        consultas: veterinario.consultas,
        createdAt: veterinario.createdAt
      })
    }
  } catch (error) {
    res.status(400).json(error)
  }
})


router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { celular, endereco } = req.body

  if (!celular || !endereco) {
    res.status(400).json({ "erro": "Informe o celular e o endereço" })
    return
  }

  try {
    const veterinario = await prisma.veterinario.update({
      where: { id: Number(id) },
      data: { celular, endereco }
    })
    res.status(200).json(veterinario)
  } catch (error) {
    res.status(400).json(error)
  }
})


router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const veterinario = await prisma.veterinario.delete({
      where: { id: Number(id) }
    })
    res.status(200).json(veterinario)
  } catch (error) {
    res.status(400).json(error)
  }
})


export default router