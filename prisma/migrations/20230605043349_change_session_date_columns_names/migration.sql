/*
  Warnings:

  - You are about to drop the column `description` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `end_date` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `Session` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_studio_id_fkey";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "description",
DROP COLUMN "end_date",
DROP COLUMN "start_date",
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_studio_id_fkey" FOREIGN KEY ("studio_id") REFERENCES "Studio"("id") ON DELETE CASCADE ON UPDATE CASCADE;
