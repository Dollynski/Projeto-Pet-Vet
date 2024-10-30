import { PrismaClient } from "@prisma/client"
import { Router } from "express"

const prisma = new PrismaClient()
const router = Router()

router.get("/", async (req, res) => {
    try {
        const racas = await prisma.raca.findMany({
            include: {
                pets: true
            }
        })
        res.status(200).json(racas)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.post("/", async (req, res) => {
    const { nome, especieId } = req.body

    if (!nome || !especieId ) {
        res.status(400).json({ "erro": "Informe o nome e a especieId" })
        return
    }

    try {
        const raca = await prisma.raca.create({
            data: { nome, especieId }
        })
        res.status(201).json(raca)
    } catch (error) {
        res.status(400).json(error)
    }
})



router.delete("/:id", async (req, res) => {
    const { id } = req.params

    try {
        const raca = await prisma.raca.delete({
            where: { id: Number(id) }
        })
        res.status(200).json(raca)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.put("/:id", async (req, res) => {
    const { id } = req.params
    const { nome, especieId } = req.body

    if (!nome || !especieId) {
        res.status(400).json({ "erro": "Informe o nome da raça e o ID da espécie" })
        return
    }

    try {
        const raca = await prisma.raca.update({
            where: { id: Number(id) },
            data: { nome, especieId }
        })
        res.status(200).json(raca)
    } catch (error) {
        res.status(400).json(error)
    }
})





export default router