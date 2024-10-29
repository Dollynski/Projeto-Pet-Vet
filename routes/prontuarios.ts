import { PrismaClient } from "@prisma/client"
import { Router } from "express"

const prisma = new PrismaClient()
const router = Router()

router.get("/", async (req, res) => {
    try {
        const prontuarios = await prisma.prontuario.findMany({
        })
        res.status(200).json(prontuarios)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.post("/", async (req, res) => {
    const { descricao, exame, tratamento, observacoes, consultaId, veterinarioId } = req.body

    if (!descricao || !exame || !tratamento || !consultaId || !veterinarioId) {
        res.status(400).json({ "erro": "Informe a descrição, exames, tratamento(s), ID da consulta e ID do veterinário" })
        return
    }

    try {
        const prontuario = await prisma.prontuario.create({
            data: { descricao, exame, tratamento, observacoes, consultaId, veterinarioId }
        })
        res.status(201).json(prontuario)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params

    try {
        const prontuario = await prisma.prontuario.delete({
            where: { id: Number(id) }
        })
        res.status(200).json(prontuario)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.put("/:id", async (req, res) => {
    const { id } = req.params
    const { descricao, exame, tratamento, observacoes } = req.body

    if (!descricao || !exame || !tratamento ) {
        res.status(400).json({ "erro": "Informe a descrição, exame(s), tramento(s)" })
        return
    }

    try {
        const prontuario = await prisma.prontuario.update({
            where: { id: Number(id) },
            data: { descricao, exame, tratamento, observacoes }
        })
        res.status(200).json(prontuario)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.get("/:id", async (req, res) => {
    const { id } = req.params

    try {
        const prontuario = await prisma.prontuario.findUnique({
            where: { id: Number(id),
             },
        })
        res.status(200).json(prontuario)
    } catch (error) {
        res.status(400).json(error)
    }
})

export default router