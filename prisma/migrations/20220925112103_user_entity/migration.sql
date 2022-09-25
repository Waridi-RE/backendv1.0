/*
  Warnings:

  - You are about to drop the column `passwordResetAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `passwordResetToken` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `verificationCode` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users_email_verificationCode_idx";

-- DropIndex
DROP INDEX "users_email_verificationCode_key";

-- DropIndex
DROP INDEX "users_email_verificationCode_passwordResetToken_idx";

-- DropIndex
DROP INDEX "users_email_verificationCode_passwordResetToken_key";

-- DropIndex
DROP INDEX "users_verificationCode_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "passwordResetAt",
DROP COLUMN "passwordResetToken",
DROP COLUMN "photo",
DROP COLUMN "verificationCode";
