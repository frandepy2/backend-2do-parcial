const { db } = require("../connection/connection");


//Controlador para crear un consumo
exports.create = async (req, res) => {
    try{
        const { id_mesa, id_cliente } = req.params;
        const cabecera = await db.cabecera.create({
            data: {
                mesa: { connect: { id: Number(id_mesa)} },
                cliente: { connect: { id: Number(id_cliente) } },
                estado : Estado.ABIERTO,
                total : 0,
                fecha_hora_creacion : new Date(),
            }
        });

        res.status(201).json(cabecera);
    }catch (error){
        console.error(error);
        res.status(500).json({error:'Error al crear la cabecera'});
    }
};

//Controlador para cerrar un consumo
exports.close = async (req, res) => {
    try{
        const { id_cabecera } = req.params;
        const cabecera = await db.cabecera.update({
            where: { id: Number(id_cabecera) },
            data: {
                estado : Estado.CERRADO,
                fecha_hora_cierre: new Date(),
            }
        });

        res.status(201).json(cabecera);
    }catch (error){
        console.error(error);
        res.status(500).json({error:'Error al cerrar la cabecera'});
    }
};

//Controlador para cambiar un cliente
exports.changeCustomer = async (req,res) => {
    try{
        const { id_cabecera } = req.params;
        const {id_cliente} = req.body;
        const cabecera = await db.cabecera.update({
            where: { id: Number(id_cabecera) },
            data: {
                cliente: { connect: { id: Number(id_cliente) } },
            }
        });
        res.status(201).json(cabecera);
    }catch (error){
        console.error(error);
        res.status(500).json({error:'Error al cambiar el cliente'});
    }
}

//Controlador que crea un detalle y agrege a la cabecera, tambien suma al total
exports.createDetail = async (req, res) => {
    try {
        const { id_cabecera } = req.params;
        const { id_producto, cantidad } = req.body;

        const producto = await db.producto.findUnique({
            where: { id: Number(id_producto) },
        });

        if (!producto) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        const detalle = await db.detalle.create({
            data: {
                cabecera: { connect: { id: Number(id_cabecera) } },
                producto: { connect: { id: Number(id_producto) } },
                cantidad: cantidad,
            },
        });

        //Calculamos el total a partir el producto y la cantidad
        const total = producto.precio * cantidad;

        //Actualizamos el total de la cabecera
        const cabecera = await db.cabecera.update({
            where: { id: Number(id_cabecera) },
            data: {
                total: { increment: total },
            },
        });

        res.status(201).json(detalle);
    }catch (error){
        console.error(error);
        res.status(500).json({error:'Error al crear el detalle'});
    }
}


exports.deleteDetail = async (req, res) => {
    try {
        const { id_cabecera, id_detalle } = req.params;

        // Verificar si el detalle existe
        const detalleExistente = await db.detalle.findUnique({
            where: { id: Number(id_detalle) },
        });
        
        if (!detalleExistente) {
            return res.status(404).json({ mensaje: "Detalle no encontrado" });
        }

        //Traemos el producto a partir del producto en detalle existente
        const producto = await db.producto.findUnique({
            where: { id: Number(detalleExistente.id_producto) },
        });
        
        //Calculamos el total a partir el producto y la cantidad
        const total = producto.precio * detalleExistente.cantidad;

        // Eliminar el detalle asociado a la cabecera
        await db.detalle.delete({
            where: { id: Number(id_detalle)},
        });

        //Actualizamos el total de la cabecera
        const cabecera = await db.cabecera.update({
            where: { id: Number(id_cabecera) },
            data: {
                total: { decrement: total },
            },
        });

        res.status(200).json({ mensaje: "Detalle eliminado exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar el detalle" });
    }
};

const Estado = {
    ABIERTO: 'ABIERTO',
    CERRADO: 'CERRADO',
};

