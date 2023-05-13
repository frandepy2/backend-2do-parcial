const { db } = require("../connection/connection");

exports.getMesas = async (req, res) => {
    db.mesas.findMany()
        .then((mesas) => {
            res.json(mesas);
        })
};

exports.addMesa = async (req, res) => {
    const { nombre_mesa, direccion, id_restaurante, pos_x, pos_y, piso, capacidad } = req.body

    try {
        const mesa = await db.mesas.create({
        data: {
            nombre_mesa, 
            direccion, 
            id_restaurante, 
            pos_x, 
            pos_y, 
            piso, 
            capacidad
        },
    })
        res.json(mesa)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al crear la mesa.' })
    }
}

exports.editMesa = async (req, res) => {
    const { id } = req.params
    const {nombre_mesa, direccion, id_restaurante, pos_x, pos_y, piso, capacidad } = req.body

    try {
    const mesa = await db.mesas.update({
        where: { id: parseInt(id) },
        data: {
            nombre_mesa, 
            direccion, 
            id_restaurante, 
            pos_x, 
            pos_y, 
            piso, 
            capacidad
        },
    })
    res.json(mesa)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al editar la mesa.' })
    }
}

exports.deleteMesa = async (req, res) => {
    const { id } = req.params

    try {
    const mesa = await db.mesas.delete({
        where: { id: parseInt(id) },
    })
    res.json(mesa)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al eliminar la mesa.' })
    }
}