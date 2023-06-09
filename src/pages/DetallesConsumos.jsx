import { Box, Container, Heading, Flex, Select, useToast, Button, Badge, Input} from '@chakra-ui/react'
import useSWR from 'swr';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";

const fetcher = (...args) => fetch(...args).then(async (res) => {
    if (!res.ok) {
        const error = new Error('An error occurred while fetching the data.')
        // Attach extra info to the error object.
        error.info = await res.json()
        error.status = res.status
        throw error
    }

    return res.json();
})

const reload = () => location.reload();


const DetallesDelConsumo = () => {
  
  const { mesaId } = useParams();
  const { data: dataCabecera, isLoading: isLoadingCabecera, error: errorCabecera } = useSWR(`http://localhost:3000/consumo/${mesaId}`, fetcher);
  const { data: dataClientes, isLoading: isLoadingClientes } = useSWR('http://localhost:3000/clientes', fetcher);
  const { data: dataProductos, isLoading: isLoadingProductos } = useSWR('http://localhost:3000/producto', fetcher);

  const handleSubmitClient = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const cliente = formData.get('cliente');

    const url = dataCabecera ? `consumo/${dataCabecera.data.cabecera.id}/customer/change` : `consumo/${mesaId}/${cliente}/create`;

    const res = await fetch(`http://localhost:3000/${url}`,{
      method: "POST",
      body: dataCabecera ? JSON.stringify({id_cliente: cliente}) : null,
      headers: {
        'Content-Type': 'application/json'
      },
    });

    const data = await res.json();
    console.log(data);
    reload();
  }

  const handleSubmitClose = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:3000/consumo/${dataCabecera.data.cabecera.id}/close`,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
    });

    const data = await res.json();
    console.log(data);
    reload();
  }

  const handleSubmitProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const cantidad = formData.get('cantidad');
    const producto = formData.get('producto');

    const res = await fetch(`http://localhost:3000/consumo/${dataCabecera.data.cabecera.id}/detail`,{
      method: "POST",
      body: JSON.stringify({
        id_producto: producto,
        cantidad
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    const data = await res.json();

    console.log(data);
    reload();
  }
  
  return (
    <Container maxW="container.xl">
      <Flex my={5} justifyContent="space-between">
        <Heading >Detalles del consumo de la mesa</Heading>
      </Flex>
      
      {isLoadingCabecera ? "Is loading..." : null}

      {!isLoadingCabecera ? <div>
        <Flex alignItems='center'>
            <Heading as='h2' size='md'>{errorCabecera && errorCabecera.status === 404 ? 'Comienza con la carga de datos!' : 'Datos registrados de la mesa'}</Heading>
            <Badge ml={3} colorScheme={errorCabecera && errorCabecera.status === 404 ? 'red' : 'green'}>{errorCabecera && errorCabecera.status === 404 ? 'Cerrado' : 'Abierto'}</Badge>
        </Flex>
        <Box maxW={200} mt={5}>
            <form onSubmit={handleSubmitClient}>
                {isLoadingClientes ? 
                <p>Loading clientes...</p> : (
                <Select placeholder='Clientes' name="cliente" width="100%" defaultValue={dataCabecera?.data.cabecera.id_cliente}>
                    {dataClientes.map(cliente => (
                    <option value={cliente.id} key={cliente.id}>{cliente.nombre}</option>
                    ))}
                </Select>
                )}
                <Button colorScheme='blue' mt={3} type="submit">{dataCabecera ? 'Cambiar cliente' : 'Asignar cliente'}</Button>
            </form>
          </Box>

          {dataCabecera ? <Box>
            <Heading as='h2' size='sm' mt={6}>Consumicion</Heading>

            <Box mt={5}>
              <ul>
                {dataCabecera.data.detalles.map(detalle => (
                  <li key={detalle.id}>{detalle.cantidad} {detalle.producto.nombre}</li>
                ))}
              </ul>
            </Box>

            <form onSubmit={handleSubmitProduct}>
            {isLoadingProductos ? 
                <p>Loading productos...</p> : (
                <Flex mt={5}>
                    <Box maxW={200}>
                        <Select placeholder='Productos' name="producto" width="100%" >
                            {dataProductos.map(producto => (
                            <option value={producto.id} key={producto.id}>{producto.nombre}</option>
                            ))}
                        </Select>
                    </Box>
                    <Input type="number" placeholder='Cantidad' name="cantidad" maxW={60} ml={3}/>
                    <Button colorScheme='blue' ml={3} type="submit">Agregar producto</Button>
                </Flex>
            )}
            </form>
          </Box> : null}
      </div> : null}

      {dataCabecera && dataCabecera.data.cabecera.total ? <Box mt={4}>Total: {dataCabecera.data.cabecera.total} Gs.</Box> : null}

      {dataCabecera && !errorCabecera && 
        <form onSubmit={handleSubmitClose}>
            <Flex mt={6}>
                <Button colorScheme='red' ml="auto" type="submit">Cerrar consumo</Button>
            </Flex>
        </form>
      }

    </Container>
  )
}

export default DetallesDelConsumo;