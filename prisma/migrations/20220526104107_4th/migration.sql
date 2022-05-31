/*
  Warnings:

  - You are about to drop the column `productImsges` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "productImsges",
ADD COLUMN     "photos" TEXT[];

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT E'USER';
