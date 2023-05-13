-- CreateTable
CREATE TABLE "Restaurante" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "direccion" TEXT
);

-- CreateTable
CREATE TABLE "Mesas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre_mesa" TEXT NOT NULL,
    "id_restaurante" INTEGER NOT NULL,
    "pos_x" REAL NOT NULL,
    "pos_y" REAL NOT NULL,
    "piso" INTEGER NOT NULL DEFAULT 1,
    "capacidad" INTEGER NOT NULL,
    CONSTRAINT "Mesas_id_restaurante_fkey" FOREIGN KEY ("id_restaurante") REFERENCES "Restaurante" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cedula" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Reserva" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_restaurante" INTEGER NOT NULL,
    "id_mesa" INTEGER NOT NULL,
    "hora_inicio" DATETIME NOT NULL,
    "hora_fin" DATETIME NOT NULL,
    "id_cliente" INTEGER NOT NULL,
    "cantidad_solicitada" INTEGER NOT NULL,
    CONSTRAINT "Reserva_id_restaurante_fkey" FOREIGN KEY ("id_restaurante") REFERENCES "Restaurante" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reserva_id_mesa_fkey" FOREIGN KEY ("id_mesa") REFERENCES "Mesas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reserva_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_cedula_key" ON "Cliente"("cedula");
