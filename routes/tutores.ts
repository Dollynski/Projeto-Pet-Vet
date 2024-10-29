import { PrismaClient } from "@prisma/client"
import { Router } from "express"
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()
const router = Router()

router.get("/", async (req, res) => {
  try {
    const tutores = await prisma.tutor.findMany({
      include: {
        pets: true,
        consultas: true
      }
    })
    res.status(200).json(tutores)
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
  const { nome, email, senha, cpf } = req.body

  if (!nome || !email || !senha || !cpf) {
    res.status(400).json({ erro: "Informe nome, cpf, email e senha" })
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
    const tutor = await prisma.tutor.create({
      data: { nome, email, senha: hash, cpf }
    })
    res.status(201).json(tutor)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post("/login", async (req, res) => {
  const { email, senha } = req.body

  // em termos de segurança, o recomendado é exibir uma mensagem padrão
  // a fim de evitar de dar "dicas" sobre o processo de login para hackers
  const mensaPadrao = "Login ou senha incorretos"
  const mensaLogado = "Login bem sucedido"

  if (!email || !senha) {
    // res.status(400).json({ erro: "Informe e-mail e senha do usuário" })
    res.status(400).json({ erro: mensaPadrao })
    return
  }

  try {
    const tutor = await prisma.tutor.findUnique({
      where: { email }
    })

    if (tutor == null) {
      // res.status(400).json({ erro: "E-mail inválido" })
      res.status(400).json({ erro: mensaPadrao })
      return
    }

    // se o e-mail existe, faz-se a comparação dos hashs
    if (bcrypt.compareSync(senha, tutor.senha)) {
      res.status(200).json({
        id: tutor.id,
        nome: tutor.nome,
        email: tutor.email
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
    const tutor = await prisma.tutor.findUnique({
      where: { id: Number(id) },
      include: {
        pets: true,
        consultas: true
      }
    })

    if (tutor == null) {
      res.status(400).json({ erro: "Tutor não cadastrado" })
    } else {
      res.status(200).json({
        id: tutor.id,
        nome: tutor.nome,
        email: tutor.email,
        cpf: tutor.cpf,
        celular: tutor.celular,
        pets: tutor.pets,
        consultas: tutor.consultas,
        createdAt: tutor.createdAt
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
    const tutor = await prisma.tutor.update({
      where: { id: Number(id) },
      data: { celular, endereco }
    })
    res.status(200).json(tutor)
  } catch (error) {
    res.status(400).json(error)
  }
})


router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const tutor = await prisma.tutor.delete({
      where: { id: Number(id) }
    })
    res.status(200).json(tutor)
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router