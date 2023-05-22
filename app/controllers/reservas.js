const { db } = require("../connection/connection");

exports.crearReserva = async (req, res) => {
    const { id_cliente, hora_inicio, hora_fin, id_restaurante, id_mesa } = req.body

    //Traer el restaurante por id
    const restaurante = await db.restaurante.findUnique({
        where: {
            id: id_restaurante
        }
    })

    //Traer el cliente por id
    const cliente = await db.cliente.findUnique({
        where: {
            id: id_cliente
        }
    })

    //Traer mesa por id
    const mesa = await db.mesas.findUnique({
        where: {
            id: id_mesa
        }
    })

    if (!cliente || !restaurante || !mesa) {
        return res.status(404).json({ mensaje: 'Cliente, mesa o restaurante no encontrado' });
    }


    try {
            // Crea la reserva
    const reserva = await db.reserva.create({
        data: {
            restaurante: { connect: { id: id_restaurante } },
            hora_inicio: new Date(hora_inicio),
            hora_fin: new Date(hora_fin),
            cliente: { connect: { id: id_cliente } },
            cantidad_solicitada: mesa.capacidad, // Establece el campo como nulo
            mesa: { connect: { id: id_mesa } }
        }});

        res.status(201).json(
            {
                data: reserva,
                message: 'Reserva creada correctamente.'
            })

    }catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error al crear la reserva.'})
    }
};
