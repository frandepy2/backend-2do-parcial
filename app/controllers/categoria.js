const { db } = require("../connection/connection");

exports.getCategoria = async (req, res) => {
    db.categoria.findMany()
        .then((categorias) => {
            res.json(categorias);
        })
};

exports.addCategoria = async (req, res) => {
    const { nombre } = req.body

    try {
        const categoria = await db.categoria.create({
        data: {
            nombre,
        },
    })
        res.json(categoria)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al crear el categoria.' })
    }
}

exports.editCategoria = async (req, res) => {
    const { id } = req.params
    const { nombre } = req.body

    try {
    const categoria = await db.categoria.update({
        where: { id: parseInt(id) },
        data: {
            nombre,
        },
    })
    res.json(categoria)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al editar el categoria.' })
    }
}

exports.deleteCategoria = async (req, res) => {
    const { id } = req.params

    try {
    const categoria = await db.categoria.delete({
        where: { id: parseInt(id) },
    })
    res.json(categoria)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al eliminar el categoria.' })
    }
}