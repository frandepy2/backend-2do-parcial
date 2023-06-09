const { db } = require("../connection/connection");

exports.getRestaurantes = async (req, res) => {
    db.restaurante.findMany()
        .then((restaurantes) => {
            res.json(restaurantes);
        })
};

exports.addRestaurante = async (req, res) => {
    const { nombre, direccion } = req.body

    try {
        const restaurante = await db.restaurante.create({
        data: {
            nombre,
            direccion,
        },
    })
        res.json(restaurante)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al crear el restaurante.' })
    }
}

exports.editRestaurante = async (req, res) => {
    const { id } = req.params
    const { nombre, direccion } = req.body

    try {
    const restaurante = await db.restaurante.update({
        where: { id: parseInt(id) },
        data: {
            nombre,
            direccion,
        },
    })
    res.json(restaurante)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al editar el restaurante.' })
    }
}

exports.deleteRestaurante = async (req, res) => {
    const { id } = req.params

    try {
    const restaurante = await db.restaurante.delete({
        where: { id: parseInt(id) },
    })
    res.json(restaurante)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al eliminar el restaurante.' })
    }
}

exports.getMesas = async (req, res) => {
    const { id } = req.params

    db.mesas.findMany({
        where: {
            restaurante: {
            id: Number(id),
            },
        },
    }).then((restaurantes) => {
        res.json(restaurantes);
    });
}