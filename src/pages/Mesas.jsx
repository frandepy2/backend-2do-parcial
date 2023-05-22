import { Button, Input, Box, Container, Table, Thead, Tr, Th, TableContainer, Td, Tbody, Heading, Flex, Select, useToast} from '@chakra-ui/react'
import ReactDatePicker from 'react-datepicker';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";

const fetcher = (...args) => fetch(...args).then(res => res.json())


const Mesa = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [reservas, setReservas] = useState([]);
  const { data: dataRestaurantes, isLoading: isLoadingRestaurantes } = useSWR('http://localhost:3000/restaurantes', fetcher);
  const { data: dataClientes, isLoading: isLoadingClientes } = useSWR('http://localhost:3000/clientes', fetcher);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const cliente = formData.get('cliente');
    const fecha = formData.get('fecha');
    const restaurante = formData.get('restaurante');

    if(!restaurante) {
      toast({
        title: 'Elija un restaurante.',
        description: "Por favor, elija un restaurante",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })

      return;
    }
    
    const res = await fetch(`http://localhost:3000/reservas/${restaurante}/${fecha}${cliente ? `/${cliente}` : ''}`)
    const data = await res.json();
    const formattedData = data.map(reserva => {
      const mesa = reserva.mesa.nombre_mesa;
      const cliente = reserva.cliente.nombre;
      const restaurante = reserva.restaurante.nombre;
      const hora_inicio = new Date(reserva.hora_inicio).getHours();
      const hora_fin = new Date(reserva.hora_fin).getHours();
      const date = new Date(reserva.hora_fin);
      const fecha = String(date.getFullYear()) + "-" + String(date.getMonth() + 1) + "-" + String(date.getDate());

      return {
        mesa,
        cliente,
        restaurante,
        hora_inicio,
        hora_fin,
        fecha
      }
    });

    setReservas(formattedData);
  }

  return (
    <Container maxW="container.xl">
      <Flex my={5} justifyContent="space-between">
        <Heading >Mesas</Heading>
        <Button as={Link} to="/reservar" colorScheme='blue'>Reservar</Button>
      </Flex>
      <form onSubmit={handleSubmit}>
        <Flex verticalAlign="middle" mb={5} alignItems="center">
          <p>Filtrar por:</p>
          {isLoadingRestaurantes ? 
            <p>Loading restaurantes...</p> : (
            <Select placeholder='Restaurantes' maxW={200} ml={3} name="restaurante">
              {dataRestaurantes.map(restaurante => (
                <option value={restaurante.id} key={restaurante.id}>{restaurante.nombre}</option>
              ))}
            </Select>
          )}

          <Box maxW={200} ml={3}>
            <ReactDatePicker dateFormat="yyyy-MM-dd" name="fecha" selected={startDate} onChange={(date) => setStartDate(date)} customInput={<Input maxW={200} name="fecha"/>} />
          </Box>
        
          <Box maxW={200} ml={3}>
            {isLoadingClientes ? 
              <p>Loading clientes...</p> : (
              <Select placeholder='Clientes' name="cliente" width="100%">
                {dataClientes.map(cliente => (
                  <option value={cliente.id} key={cliente.id}>{cliente.nombre}</option>
                ))}
              </Select>
            )}
          </Box>

          <Button ml={3} type="submit">Filtrar</Button>
        </Flex>
      </form>
      <TableContainer>
      {reservas.length > 0 ? <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Restaurante</Th>
            <Th>Fecha</Th>
            <Th>Horario</Th>
            <Th>Cliente</Th>
            <Th isNumeric>Mesa</Th>
          </Tr>
        </Thead>
        <Tbody>
          {reservas.map(reserva => (
            <Tr key={reserva.id}>
              <Td>{reserva.restaurante}</Td>
              <Td>{reserva.fecha}</Td>
              <Td>{reserva.hora_inicio}:00 - {reserva.hora_fin}:00</Td>
              <Td>{reserva.cliente}</Td>
              <Td isNumeric>{reserva.mesa}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table> : "Seleccionar los filtros."}
    </TableContainer>
    </Container>
  )
}

export default Mesa;