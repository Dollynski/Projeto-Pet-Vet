import { PrismaClient } from "@prisma/client"
import { Router } from "express"

const prisma = new PrismaClient()
const router = Router()


router.get("/", async (req, res) => {
    try {
        const consultas = await prisma.consulta.findMany({
            include: {
                prontuarios: true,
                tutor: true,
                veterinario: true,
            }
        })
        res.status(200).json(consultas)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.post("/", async (req, res) => {
    const { data, tutorId, veterinarioId, petId, status, descricao } = req.body;

    if (!data || !tutorId || !veterinarioId || !petId || !descricao) {
        res.status(400).json({ "erro": "Informe a data da consulta, o ID do tutor, ID do veterinário e ID do pet que será atendido" });
        return;
    }

    try {
        const consulta = await prisma.consulta.create({
            data: {
                data: new Date(data), // Ajuste para DateTime
                tutorId: tutorId,
                veterinarioId: veterinarioId,
                petId: petId,
                status: status || "AGUARDANDO", // Define o status padrão como "AGUARDANDO" caso não seja fornecido
                descricao: descricao
            }
        });
        res.status(201).json(consulta);
    } catch (error) {
        res.status(400).json({ error });
    }
});


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

router.get("/tutores/:tutorId/pets", async (req, res) => {
    const { tutorId } = req.params;

    try {
        const pets = await prisma.pet.findMany({
            where: { tutorId: Number(tutorId) }
        });
        res.status(200).json(pets);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.get("/:veterinarioId", async (req, res) => {
    const { veterinarioId } = req.params;

    try {
        const consultas = await prisma.consulta.findMany({
            where: { veterinarioId: Number(veterinarioId) },
            include: {
                prontuarios: true,
                tutor: true,
                pet: true,
            }
        });
        res.status(200).json(consultas);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.patch("/:id/confirmar", async (req, res) => {
    const { id } = req.params;

    try {
        const consulta = await prisma.consulta.update({
            where: { id: Number(id) },
            data: { status: "ACEITA" }
        });
        res.status(200).json(consulta);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.delete("/:id/deletar", async (req, res) => {
    const { id } = req.params;

    try {
        const consulta = await prisma.consulta.delete({
            where: { id: Number(id) }
        });
        res.status(200).json(consulta);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.patch("/:id/alterar", async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    if (!data) {
        res.status(400).json({ "erro": "Informe a nova data da consulta" });
        return;
    }

    try {
        const consulta = await prisma.consulta.update({
            where: { id: Number(id) },
            data: { data: new Date(data) }
        });
        res.status(200).json(consulta);
    } catch (error) {
        res.status(400).json(error);
    }
});
export default router