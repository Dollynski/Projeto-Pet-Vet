-- CreateEnum
CREATE TYPE "Status" AS ENUM ('AGUARDANDO', 'ACEITA', 'RECUSADA');

-- CreateEnum
CREATE TYPE "Sexo" AS ENUM ('MACHO', 'FEMEA');

-- CreateTable
CREATE TABLE "tutores" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(60) NOT NULL,
    "email" VARCHAR(60) NOT NULL,
    "senha" VARCHAR(60) NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,
    "celular" VARCHAR(11),
    "endereco" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tutores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "veterinarios" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(60) NOT NULL,
    "email" VARCHAR(60) NOT NULL,
    "senha" VARCHAR(60) NOT NULL,
    "cnpj" VARCHAR(14) NOT NULL,
    "celular" VARCHAR(11),
    "endereco" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "veterinarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consultas" (
    "id" SERIAL NOT NULL,
    "data" DATE NOT NULL,
    "tutorId" INTEGER NOT NULL,
    "veterinarioId" INTEGER NOT NULL,
    "petId" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'AGUARDANDO',
    "descricao" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "consultas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prontuarios" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,
    "exame" VARCHAR(255) NOT NULL,
    "tratamento" VARCHAR(255) NOT NULL,
    "observacoes" VARCHAR(255),
    "consultaId" INTEGER NOT NULL,
    "veterinarioId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prontuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "dataNasc" TEXT NOT NULL,
    "tutorId" INTEGER NOT NULL,
    "racaId" INTEGER NOT NULL,
    "foto" VARCHAR(400) NOT NULL,
    "idade" INTEGER NOT NULL,
    "peso" DOUBLE PRECISION NOT NULL,
    "sexo" "Sexo" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "racas" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "especieId" INTEGER NOT NULL,

    CONSTRAINT "racas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "especies" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "especies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tutores_email_key" ON "tutores"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tutores_cpf_key" ON "tutores"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "veterinarios_email_key" ON "veterinarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "especies_nome_key" ON "especies"("nome");

-- AddForeignKey
ALTER TABLE "consultas" ADD CONSTRAINT "consultas_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "tutores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultas" ADD CONSTRAINT "consultas_veterinarioId_fkey" FOREIGN KEY ("veterinarioId") REFERENCES "veterinarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultas" ADD CONSTRAINT "consultas_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prontuarios" ADD CONSTRAINT "prontuarios_consultaId_fkey" FOREIGN KEY ("consultaId") REFERENCES "consultas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prontuarios" ADD CONSTRAINT "prontuarios_veterinarioId_fkey" FOREIGN KEY ("veterinarioId") REFERENCES "veterinarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "tutores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_racaId_fkey" FOREIGN KEY ("racaId") REFERENCES "racas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "racas" ADD CONSTRAINT "racas_especieId_fkey" FOREIGN KEY ("especieId") REFERENCES "especies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
