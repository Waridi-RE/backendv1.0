/*
  Warnings:

  - The primary key for the `landlord` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `imageURL` on the `landlord` table. All the data in the column will be lost.
  - You are about to drop the column `public_id` on the `landlord` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "landlord" DROP CONSTRAINT "landlord_pkey",
DROP COLUMN "imageURL",
DROP COLUMN "public_id",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "landlord_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "landlord_id_seq";

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "users_id_seq";
