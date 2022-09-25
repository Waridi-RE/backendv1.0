/*
  Warnings:

  - A unique constraint covering the columns `[email,verificationCode,passwordResetToken]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `passwordResetToken` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "RoleEnumType" ADD VALUE 'tenant';
ALTER TYPE "RoleEnumType" ADD VALUE 'landlord';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isVerified" TEXT NOT NULL DEFAULT E'false',
ADD COLUMN     "passwordResetAt" TIMESTAMP(3),
ADD COLUMN     "passwordResetToken" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "users_email_verificationCode_passwordResetToken_idx" ON "users"("email", "verificationCode", "passwordResetToken");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_verificationCode_passwordResetToken_key" ON "users"("email", "verificationCode", "passwordResetToken");
