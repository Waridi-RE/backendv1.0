/*
  Warnings:

  - You are about to drop the column `imageURL` on the `landlord` table. All the data in the column will be lost.
  - You are about to drop the column `public_id` on the `landlord` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "landlord" DROP COLUMN "imageURL",
DROP COLUMN "public_id";
