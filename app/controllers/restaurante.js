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