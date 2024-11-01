import { PrismaClient } from "@prisma/client"
import { Router } from "express"

const prisma = new PrismaClient()
const router = Router()

router.get("/", async (req, res) => {
    try {
        const pets = await prisma.pet.findMany({
            include: {
                consultas: true
            }
        })
        res.status(200).json(pets)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.post("/", async (req, res) => {
    const { nome, dataNasc, tutorId, racaId, foto, idade, peso, sexo } = req.body

    if (!nome || !dataNasc || !tutorId || !racaId || !foto || !idade || !peso || !sexo) {
        res.status(400).json({ "erro": "Informe o nome do pet, data de nascimento, ID do tutor e ID da raça e a foto" })
        return
    }

    try {
        const pet = await prisma.pet.create({
            data: { nome, dataNasc, tutorId, racaId, foto, idade, peso, sexo }
        })
        res.status(201).json(pet)
    } catch (error) {
        res.status(400).json(error)
    }
})



router.delete("/:id", async (req, res) => {
    const { id } = req.params

    try {
        const pet = await prisma.pet.delete({
            where: { id: Number(id) }
        })
        res.status(200).json(pet)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.put("/:id", async (req, res) => {
    const { id } = req.params
    const { nome, dataNasc, tutorId, racaId, foto, idade, peso, sexo } = req.body

    if (!nome || !dataNasc || !tutorId || !racaId || !foto || !idade || !peso || !sexo) {
        res.status(400).json({ "erro": "Informe o nome do pet, data de nascimento, ID do tutor e ID da raça" })
        return
    }

    try {
        const pet = await prisma.pet.update({
            where: { id: Number(id) },
            data: { nome, dataNasc, tutorId, racaId, foto, idade, peso, sexo }
        })
        res.status(200).json(pet)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.get("/:id", async (req, res) => {
    const { id } = req.params

    try {
        const pet = await prisma.pet.findUnique({
            where: { id: Number(id) },
            include: {
                consultas: true,
                tutor: true,
            }
        })
        res.status(200).json(pet)
    } catch (error) {
        res.status(400).json(error)
    }
})

export default router