const { db } = require("../connection/connection");

exports.getProductos = async (req, res) => {
  db.producto.findMany().then((productos) => {
    res.json(productos);
  });
};

exports.getProductosByCategoria = async (req, res) => {
  const { idCategoria } = req.params;
  try {
    const productos = await db.producto.findMany({
      where: {
        categoria: {
          id: Number(idCategoria),
        },
      },
      include: {
        categoria: {
          select: {
            nombre: true,
          },
        },
      },
    });
    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la producto." });
  }
};

exports.getProductoById = async (req, res) => {
  const { id } = req.params;

  try {
    const producto = await db.producto.findUnique({
      where: { id: parseInt(id) },
    });
    res.json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la producto." });
  }
};

exports.addProducto = async (req, res) => {
  const { nombre, id_categoria, precio } =
    req.body;

  try {
    const producto = await db.producto.create({
      data: {
        nombre,
        id_categoria,
        precio,
      },
    });
    res.json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la producto." });
  }
};

exports.editProducto = async (req, res) => {
  const { id } = req.params;
  const { nombre, id_categoria, precio } =
    req.body;

  try {
    const producto = await db.producto.update({
      where: { id: parseInt(id) },
      data: {
        nombre,
        id_categoria,
        precio,
      },
    });
    res.json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al editar la mesa." });
  }
};

exports.deleteProducto = async (req, res) => {
  const { id } = req.params;

  try {
    const producto = await db.producto.delete({
      where: { id: parseInt(id) },
    });
    res.json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar la producto." });
  }
};