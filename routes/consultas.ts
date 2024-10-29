import { PrismaClient } from "@prisma/client"
import { Router } from "express"

const prisma = new PrismaClient()
const router = Router()

router.get("/", async (req, res) => {
    try {
        const consultas = await prisma.consulta.findMany({
            include: {
                prontuarios: true
            }
        })
        res.status(200).json(consultas)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.post("/", async (req, res) => {
    const { data, tutorId, veterinarioId, petId, status, descricao } = req.body

    if (!data || !tutorId || !veterinarioId || !petId || !descricao) {
        res.status(400).json({ "erro": "Informe a data da consulta, o ID do tutor, ID do veterinário e ID do pet que será atendido" })
        return
    }

    try {
        const consulta = await prisma.consulta.create({
            data: { data, tutorId, veterinarioId, petId, status, descricao}
        })
        res.status(201).json(consulta)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params

    try {
        const consulta = await prisma.consulta.delete({
            where: { id: Number(id) }
        })
        res.status(200).json(consulta)
    } catch (error) {
        res.status(400).json(error)
    }
})



router.put("/:id", async (req, res) => {
    const { id } = req.params
    const { data, tutorId, petId, veterinarioId, status} = req.body

    if ( !data || !tutorId || !petId || !veterinarioId || !status) {
        res.status(400).json({ "erro": "Informe a data da consulta, o ID do tutor, ID do veterinário e ID do pet que será atendido" })
        return
    }

    try {
        const consulta = await prisma.consulta.update({
            where: { id: Number(id) },
            data: { data, tutorId, petId, veterinarioId, status }
        })
        res.status(200).json(consulta)
    } catch (error) {
        res.status(400).json(error)
    }
})


export default router