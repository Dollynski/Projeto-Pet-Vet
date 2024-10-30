import { PrismaClient } from "@prisma/client"
import { Router } from "express"

const prisma = new PrismaClient()
const router = Router()

router.get("/", async (req, res) => {
    try {
        const especies = await prisma.especie.findMany({
            include: {
                racas: true
            }
        })
        res.status(200).json(especies)
    } catch (error) {
        res.status(400).json(error)
    }
})



router.post("/", async (req, res) => {
    const { nome } = req.body

    if (!nome) {
        res.status(400).json({ "erro": "Informe o nome da especie" })
        return
    }

    try {
        const especie = await prisma.especie.create({
            data: { nome }
        })
        res.status(201).json(especie)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params

    try {
        const especie = await prisma.especie.delete({
            where: { id: Number(id) }
        })
        res.status(200).json(especie)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.put("/:id", async (req, res) => {
    const { id } = req.params
    const { nome } = req.body
    
    if (!nome) {
        res.status(400).json({ "erro": "Informe o nome da espécie"})
        return
    }
    try {
        const especie = await prisma.especie.update({
            where: { id: Number(id) },
            data: { nome }
        })
        res.status(200).json(especie)
    } catch (error) {
        res.status(400).json(error)
    }
})


export default router