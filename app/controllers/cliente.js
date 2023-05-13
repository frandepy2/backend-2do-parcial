const { db } = require("../connection/connection");

exports.getClientes = async (req, res) => {
    try {
        const clientes = await db.cliente.findMany()
        res.json(clientes)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al obtener los clientes.' })
    }
}

exports.getClienteById = async (req, res) => {
    const { id } = req.params

    try {
        const cliente = await db.cliente.findUnique({
            where: { id: parseInt(id) },
        })
        res.json(cliente)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al obtener el cliente.' })
    }
}

exports.addCliente = async (req, res) => {
    const { cedula, nombre, apellido } = req.body

    try {
        const cliente = await db.cliente.create({
            data: {
                cedula,
                nombre,
                apellido,
            },
        })
        res.json(cliente)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al crear el cliente.' })
    }
}

exports.editCliente = async (req, res) => {
    const { id } = req.params
    const { cedula, nombre, apellido } = req.body

    try {
        const cliente = await db.cliente.update({
            where: { id: parseInt(id) },
            data: {
                cedula,
                nombre,
                apellido,
            },
        })
        res.json(cliente)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al editar el cliente.' })
    }
}

exports.deleteCliente = async (req, res) => {
    const { id } = req.params

    try {
        const cliente = await db.cliente.delete({
            where: { id: parseInt(id) },
        })
        res.json(cliente)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al eliminar el cliente.' })
    }
}