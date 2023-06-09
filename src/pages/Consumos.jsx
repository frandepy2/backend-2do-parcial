import { Button, Container, Table, Thead, Tr, Th, TableContainer, Td, Tbody, Heading, Flex, Select, useToast} from '@chakra-ui/react'
import useSWR from 'swr';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";

const fetcher = (...args) => fetch(...args).then(res => res.json())


const Consumos = () => {
  const [mesas, setMesas] = useState([]);
  const { data: dataRestaurantes, isLoading: isLoadingRestaurantes } = useSWR('http://localhost:3000/restaurantes', fetcher);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
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
    
    const res = await fetch(`http://localhost:3000/restaurantes/${restaurante}/mesas`)
    const data = await res.json();
    setMesas(data);
  }

  return (
    <Container maxW="container.xl">
      <Flex my={5} justifyContent="space-between">
        <Heading >Consumos</Heading>
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

          <Button ml={3} type="submit">Filtrar</Button>
        </Flex>
      </form>
      <TableContainer>
      {mesas.length > 0 ? <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Mesa</Th>
            <Th isNumeric>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {mesas.map(mesa => (
            <Tr key={mesa.id}>
              <Td>{mesa.nombre_mesa}</Td>
              <Td isNumeric>
              <Button as={Link} to={`/consumos/${mesa.id}`} colorScheme='blue'>Ver detalles</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table> : "Seleccionar los filtros."}
    </TableContainer>
    </Container>
  )
}

export default Consumos;