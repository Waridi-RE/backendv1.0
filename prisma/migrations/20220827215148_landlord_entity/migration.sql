/*
  Warnings:

  - Added the required column `imageURL` to the `landlord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `public_id` to the `landlord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "landlord" ADD COLUMN     "imageURL" VARCHAR(255) NOT NULL,
ADD COLUMN     "public_id" VARCHAR(255) NOT NULL;
