import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const prisma = new PrismaClient();
const router = Router();

// Rota para obter todos os pets
router.get("/", async (req, res) => {
    try {
        const pets = await prisma.pet.findMany({
            include: {
                consultas: true,
                raca: true, // Incluindo a relação com Raca
            }
        });
        res.status(200).json(pets);
    } catch (error) {
        res.status(400).json(error);
    }
});

// Rota para criar um novo pet
router.post("/", async (req, res) => {
    const { nome, dataNasc, tutorId, racaId, foto, idade, peso, sexo } = req.body;

    if (!nome || !dataNasc || !tutorId || !racaId || !foto || !idade || !peso || !sexo) {
        res.status(400).json({ "erro": "Informe o nome do pet, data de nascimento, idade, peso, sexo, ID do tutor, ID da raça e a foto" });
        return;
    }

    try {
        const pet = await prisma.pet.create({
            data: { nome, dataNasc, tutorId, racaId, foto, idade, peso, sexo },
            include: {
                raca: true, // Incluindo a relação com Raca no retorno
            }
        });
        res.status(201).json(pet);
    } catch (error) {
        res.status(400).json(error);
    }
});

// Rota para deletar um pet
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const pet = await prisma.pet.delete({
            where: { id: Number(id) }
        });
        res.status(200).json(pet);
    } catch (error) {
        res.status(400).json(error);
    }
});

// Rota para atualizar um pet
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { nome, dataNasc, tutorId, racaId, foto, idade, peso, sexo } = req.body;

    if (!nome || !dataNasc || !tutorId || !racaId || !foto || !idade || !peso || !sexo) {
        res.status(400).json({ "erro": "Informe o nome do pet, data de nascimento, idade, peso, sexo, ID do tutor, ID da raça e a foto" });
        return;
    }

    try {
        const pet = await prisma.pet.update({
            where: { id: Number(id) },
            data: { nome, dataNasc, tutorId, racaId, foto, idade, peso, sexo },
            include: {
                raca: true, // Incluindo a relação com Raca no retorno
            }
        });
        res.status(200).json(pet);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.patch("/:id", async (req, res) => {
    const { id } = req.params
    const { nome, dataNasc, tutorId, racaId, foto, peso, idade, sexo } = req.body
  
    const data: any = {}
    if (nome) data.nome = nome
    if (dataNasc) data.dataNasc = dataNasc
    if (tutorId) data.tutorId = tutorId
    if (racaId) data.racaId = racaId
    if (foto) data.foto = foto
    if (peso) data.peso = peso
    if (idade) data.idade = idade 
    if (sexo) data.sexo = sexo

    if (Object.keys(data).length === 0) {
      res.status(400).json({ erro: "Informe ao menos um campo para atualizar" })
      return
    }
  
    try {
      const pet = await prisma.pet.update({
        where: { id: Number(id) },
        data
      })
      res.status(200).json(pet)
    } catch (error) {
      res.status(400).json(error)
    }
  })







// Rota para obter um pet específico
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const pet = await prisma.pet.findUnique({
            where: { id: Number(id) },
            include: {
                consultas: true,
                tutor: true,
                raca: true, // Incluindo a relação com Raca
            }
        });
        res.status(200).json(pet);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.get("/pesquisa/:termo", async (req, res) => {
    const { termo } = req.params
  
    // tenta converter o termo em número
    const termoNumero = Number(termo)
  
    // se a conversão gerou um NaN (Not a Number)
    if (isNaN(termoNumero)) {
      try {
        const pets = await prisma.pet.findMany({
          include: {
            tutor: true,
            consultas: true,
            raca:true,

          },
          where: {
            OR: [
              { nome: { contains: termo }},
              { raca: { nome: termo}},
              { tutor: { nome: termo }}
            ]
          }
        })
        res.status(200).json(pets)
      } catch (error) {
        res.status(400).json(error)
      }
    } else {
      try {
        const pets = await prisma.pet.findMany({
          include: {
            tutor: true,
            consultas: true,
            raca: true
          },
          where: {
            OR: [
              { peso: { lte: termoNumero }},
              { idade: termoNumero }
            ]
          }
        })
        res.status(200).json(pets)
      } catch (error) {
        res.status(400).json(error)
      }
    }
  })


export default router;
