/*
  Warnings:

  - The primary key for the `landlord` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `landlord` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "landlord" DROP CONSTRAINT "landlord_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "landlord_id_key" ON "landlord"("id");
