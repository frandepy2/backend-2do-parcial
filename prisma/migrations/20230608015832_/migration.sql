/*
  Warnings:

  - You are about to drop the column `precion` on the `Producto` table. All the data in the column will be lost.
  - Added the required column `precio` to the `Producto` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Producto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "id_categoria" INTEGER NOT NULL,
    "precio" INTEGER NOT NULL,
    CONSTRAINT "Producto_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "Categoria" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Producto" ("id", "id_categoria", "nombre") SELECT "id", "id_categoria", "nombre" FROM "Producto";
DROP TABLE "Producto";
ALTER TABLE "new_Producto" RENAME TO "Producto";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
