import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

// Rota para obter dados gerais do sistema
router.get("/gerais", async (req, res) => {
    try {
        const totalVeterinarios = await prisma.veterinario.count();
        const consultasPendentes = await prisma.consulta.count({
            where: { status: "AGUARDANDO" },
        });
        
        const totalPets = await prisma.pet.count();

        res.json({
            veterinarios: totalVeterinarios,
            consultas: consultasPendentes,
            pets: totalPets,
        });
    } catch (error) {
        console.error("Erro ao buscar dados gerais:", error);
        res.status(500).json({ error: "Erro ao buscar dados gerais" });
    }
});

// Rota para obter dados de consultas por veterinário
router.get("/consultasVeterinario", async (req, res) => {
    try {
        const consultasPorVeterinario = await prisma.consulta.groupBy({
            by: ["veterinarioId"],
            where: {
                status: "ACEITA",
            },
            _count: {
                id: true,
            },
        });

        const resultados = await Promise.all(
            consultasPorVeterinario.map(async (consulta) => {
                const veterinario = await prisma.veterinario.findUnique({
                    where: { id: consulta.veterinarioId },
                });

                return {
                    veterinario: veterinario?.nome || "Desconhecido",
                    num: consulta._count.id,
                };
            })
        );

        res.json(resultados);
    } catch (error) {
        console.error("Erro ao buscar dados de consultas por veterinário:", error);
        res.status(500).json({ error: "Erro ao buscar dados de consultas por veterinário" });
    }
});

export default router;
