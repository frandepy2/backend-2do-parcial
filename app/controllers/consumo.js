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

const Estado = {
    ABIERTO: 'ABIERTO',
    CERRADO: 'CERRADO',
};

