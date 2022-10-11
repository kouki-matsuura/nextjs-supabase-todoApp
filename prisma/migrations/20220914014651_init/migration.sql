/*
  Warnings:

  - You are about to drop the `todos` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateTable
CREATE TABLE "ToDo" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "is_complete" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ToDo_pkey" PRIMARY KEY ("id")
);
