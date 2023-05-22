import { Container, Button, Flex, Radio, RadioGroup, Heading, Select, Checkbox, FormControl, FormLabel, Input, Box, useToast} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const Reservas = () => {

  const [startDate, setStartDate] = useState(new Date());
  const [hours, setHours] = useState([...new Array(11).fill(false)]);
  const { data: dataRestaurantes, isLoading: isLoadingRestaurantes } = useSWR('http://localhost:3000/restaurantes', fetcher);
  const toast = useToast();
  const [mesas, setMesas] = useState([]);
  const [mesaValue, setMesaValue] = useState("");
  const { data: dataClientes, isLoading: isLoadingClientes } = useSWR('http://localhost:3000/clientes', fetcher);
  const createRef = useRef({
    hora_inicio:"",
    hora_fin:"",
    restaurante: ""
  });

  const updateHours = (e) => {
    const parent = e.target.parentElement;
    const position = Number(parent.dataset.hour);
    
    if(e.target.checked){
      if(hours[position - 1] || hours[position + 1]){
        const newHours = [...hours];
        newHours[position] = true;
        setHours([...newHours]);
      }else if(!hours.includes(true)){
        const newHours = [...hours];
        newHours[position] = true;
        setHours([...newHours]);
      }
    }else{
      if(!hours[position + 1]){
        const newHours = [...hours];
        newHours[position] = false;
        setHours([...newHours]);
      }else{
        const newHours = [...hours].map((hour, idx) => {
          if(idx <= position) return false
          return hour
        });
        
        setHours([...newHours]);
      }
    }
  }

  const handleSubmitRetrieveTables = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const restaurante = formData.get('restaurante');
    const fecha = formData.get('fecha');
    const horas = document.querySelectorAll('[name="hours"]:checked');

    if(!restaurante || !fecha || horas.length === 0){
      toast({
        title: 'Elija todas las opciones.',
        description: "Por favor, elija todas las opciones requeridas",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })

      return;
    }


    const hora_inicio = horas[0].parentElement.dataset.hourStart;
    const hora_fin = horas.length > 1 ? horas[horas.length - 1].parentElement.dataset.hourFinish : horas[0].parentElement.dataset.hourFinish;
    const yearMonthDay = fecha.split("-");
    const date_hora_inicio = new Date(yearMonthDay[0], yearMonthDay[1] - 1, yearMonthDay[2], hora_inicio);
    const date_hora_fin = new Date(yearMonthDay[0], yearMonthDay[1] - 1, yearMonthDay[2], hora_fin);
    const res = await fetch(`http://localhost:3000/mesas/${restaurante}/${date_hora_inicio.toISOString()}/${date_hora_fin.toISOString()}`);
    const data = await res.json();

    setMesas(data);
    createRef.current.hora_inicio = date_hora_inicio.toISOString();
    createRef.current.hora_fin = date_hora_fin.toISOString();
    createRef.current.restaurante = restaurante;
  }

  const handleSubmitReservar = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const restaurante = formData.get('restaurante');
    const hora_inicio = formData.get('hora_inicio');
    const hora_fin = formData.get('hora_fin');
    const cliente = formData.get('cliente');
    const mesa = formData.get('mesa');

    const data = {
      id_cliente: cliente,
      hora_inicio,
      hora_fin,
      id_mesa: mesa,
      id_restaurante: restaurante
    };

    console.log(data);

    const res = await fetch("http://localhost:3000/reservas/create",{
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    const dataRes = await res.json();

    console.log(dataRes);
  }

  return (
    <Container maxW="container.xl" mb={10}>
      <Heading as="h1" mt={4}>Reservar</Heading>
      <Heading as="h2" size="md" mt={3}>Elegir opciones</Heading>

      <form onSubmit={handleSubmitRetrieveTables}>
        <Flex mt={5} width="100%">
          <Flex direction="column" flex={0.5}>
            <FormControl>
              <FormLabel>Restaurante:</FormLabel>
              {isLoadingRestaurantes ? 
              <p>Loading restaurantes...</p> : (
              <Select placeholder='Restaurantes' maxW={200} name="restaurante">
                {dataRestaurantes.map(restaurante => (
                  <option value={restaurante.id} key={restaurante.id}>{restaurante.nombre}</option>
                ))}
              </Select>
            )}
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Fecha:</FormLabel>
              <ReactDatePicker minDate={new Date()} dateFormat="yyyy-MM-dd" name="fecha" selected={startDate} onChange={(date) => setStartDate(date)} customInput={<Input name="fecha" />}/>
            </FormControl>
            {/* <FormControl mt={4}>
              <FormLabel>Cedula:</FormLabel>
              <Input type='number' placeholder='4689262' name="cedula"/>
            </FormControl> */}
          </Flex>
          <Box width={100}/>
          <FormControl flex={0.5}>
            <FormLabel>Horario:</FormLabel>
            <Flex direction="column">
              <Checkbox name="hours" data-hour="0" data-hour-start="12" data-hour-finish="13" onChange={updateHours} isChecked={hours[0]} value={hours[0]}>12 a 13</Checkbox>
              <Checkbox name="hours" data-hour="1" data-hour-start="13" data-hour-finish="14" onChange={updateHours} isChecked={hours[1]} value={hours[1]}>13 a 14</Checkbox>
              <Checkbox name="hours" data-hour="2" data-hour-start="14" data-hour-finish="15" onChange={updateHours} isChecked={hours[2]} value={hours[2]}>14 a 15</Checkbox>
              <Checkbox name="hours" data-hour="3" data-hour-start="15" data-hour-finish="16" onChange={updateHours} isChecked={hours[3]} value={hours[3]}>15 a 16</Checkbox>
              <Checkbox name="hours" data-hour="4" data-hour-start="16" data-hour-finish="17" onChange={updateHours} isChecked={hours[4]} value={hours[4]}>16 a 17</Checkbox>
              <Checkbox name="hours" data-hour="5" data-hour-start="17" data-hour-finish="18" onChange={updateHours} isChecked={hours[5]} value={hours[5]}>17 a 18</Checkbox>
              <Checkbox name="hours" data-hour="6" data-hour-start="18" data-hour-finish="19" onChange={updateHours} isChecked={hours[6]} value={hours[6]}>18 a 19</Checkbox>
              <Checkbox name="hours" data-hour="7" data-hour-start="19" data-hour-finish="20" onChange={updateHours} isChecked={hours[7]} value={hours[7]}>19 a 20</Checkbox>
              <Checkbox name="hours" data-hour="8" data-hour-start="20" data-hour-finish="21" onChange={updateHours} isChecked={hours[8]} value={hours[8]}>20 a 21</Checkbox>
              <Checkbox name="hours" data-hour="9" data-hour-start="21" data-hour-finish="22" onChange={updateHours} isChecked={hours[9]} value={hours[9]}>21 a 22</Checkbox>
              <Checkbox name="hours" data-hour="10" data-hour-start="22" data-hour-finish="23" onChange={updateHours} isChecked={hours[10]} value={hours[10]}>22 a 23</Checkbox>
            </Flex>
          </FormControl>
        </Flex>
        <Button type="submit" mt={5}>Buscar</Button>
      </form>

      <Heading as="h2" size="md" mt={10}>Elegir mesa</Heading>
      <form onSubmit={handleSubmitReservar} className="form-reservar">
        <input type="hidden" name="hora_inicio" value={createRef.current.hora_inicio} />
        <input type="hidden" name="hora_fin" value={createRef.current.hora_fin} />
        <input type="hidden" name="restaurante" value={createRef.current.restaurante} />

        <Flex direction="column" mt={3} gap={2}>
          {mesas.length > 0 && mesas.map(mesa => (
            <Radio name="mesa" key={mesa.id} value={mesa.id} isChecked={mesa.id == mesaValue} onChange={(e) => setMesaValue(e.target.value)}>{mesa.nombre_mesa}</Radio>
          ))}
        </Flex>

        {mesaValue && 
          <Box maxW={200} mt={3}>
            {isLoadingClientes ? 
              <p>Loading clientes...</p> : (
              <Select placeholder='Clientes' name="cliente" width="100%">
                {dataClientes.map(cliente => (
                  <option value={cliente.id} key={cliente.id}>{cliente.nombre}</option>
                ))}
              </Select>
            )}
          </Box>
        }

        {mesaValue && <Button type="submit" mt={4}>Reservar mesa</Button>}
      </form>
      
      
    </Container>
  )
}
  
export default Reservas;