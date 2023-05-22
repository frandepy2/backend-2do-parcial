const { db } = require("../connection/connection");

exports.getMesas = async (req, res) => {
  db.mesas.findMany().then((mesas) => {
    res.json(mesas);
  });
};

exports.getMesasDisponibles = async (req, res) => {
  const { idRestaurante, horaInicio, horaFin } = req.params;
  try {
    const mesas = await db.mesas.findMany({
      where: {
        restaurante: {
          id: idRestaurante,
        },
      },
      include: {
        restaurante: {
          select: {
            nombre: true,
          },
        },
      },
    });

    for (let i = 0; i < mesas.length; i++) {
      const mesa = mesas[i];
      const reservas = await db.reserva.findMany({
        where: {
          id_mesa: mesa.id, // Compara si esta mesa ya está en reserva
          hora_inicio: { gte: horaInicio }, // Compara si ya está reservada en ese rango de horario
          hora_inicio: { lte: horaFin },
          OR: [
            { hora_fin: { gte: horaInicio } }, // Compara si la hora de fin es mayor o igual al inicio dado
            { hora_fin: { lte: horaFin } }, // Compara si la hora de fin es menor o igual al fin dado
          ],
        },
      });

      if (reservas.length > 0) {
        mesas.splice(i, 1); // Elimina la mesa de la lista
        i--; // Actualiza el índice para evitar saltarse la siguiente mesa
      }
    }

    res.json(mesas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la mesa." });
  }
};

exports.getMesaById = async (req, res) => {
  const { id } = req.params;

  try {
    const mesa = await db.mesas.findUnique({
      where: { id: parseInt(id) },
    });
    res.json(mesa);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la mesa." });
  }
};

exports.addMesa = async (req, res) => {
  const { nombre_mesa, id_restaurante, pos_x, pos_y, piso, capacidad } =
    req.body;

  try {
    const mesa = await db.mesas.create({
      data: {
        nombre_mesa,
        id_restaurante,
        pos_x,
        pos_y,
        piso,
        capacidad,
      },
    });
    res.json(mesa);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la mesa." });
  }
};

exports.editMesa = async (req, res) => {
  const { id } = req.params;
  const { nombre_mesa, id_restaurante, pos_x, pos_y, piso, capacidad } =
    req.body;

  try {
    const mesa = await db.mesas.update({
      where: { id: parseInt(id) },
      data: {
        nombre_mesa,
        id_restaurante,
        pos_x,
        pos_y,
        piso,
        capacidad,
      },
    });
    res.json(mesa);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al editar la mesa." });
  }
};

exports.deleteMesa = async (req, res) => {
  const { id } = req.params;

  try {
    const mesa = await db.mesas.delete({
      where: { id: parseInt(id) },
    });
    res.json(mesa);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar la mesa." });
  }
};
