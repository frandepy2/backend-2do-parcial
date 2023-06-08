-- CreateTable
CREATE TABLE "Cabecera" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_mesa" INTEGER NOT NULL,
    "id_cliente" INTEGER NOT NULL,
    "estado" TEXT NOT NULL,
    "total" REAL NOT NULL,
    "fecha_hora_creacion" DATETIME NOT NULL,
    "fecha_hora_cierre" DATETIME,
    CONSTRAINT "Cabecera_id_mesa_fkey" FOREIGN KEY ("id_mesa") REFERENCES "Mesas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Cabecera_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Detalle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_cabecera" INTEGER NOT NULL,
    "id_producto" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    CONSTRAINT "Detalle_id_cabecera_fkey" FOREIGN KEY ("id_cabecera") REFERENCES "Cabecera" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Detalle_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "Producto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
