import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Mesa from './pages/mesas';
import Reservas from './pages/Reservas';
import Consumos from "./pages/Consumos";
import DetallesDelConsumo from "./pages/DetallesConsumos";

const router = createBrowserRouter([
  {
    path:"/",
    element: <Navigate to="/mesas"/>
  },
  {
    path: "/mesas",
    element: <Mesa />,
  },
  {
    path: "/reservar",
    element: <Reservas />,
  },
  {
    path: "/consumos",
    element: <Consumos />,
  },
  {
    path: "/consumos/:mesaId",
    element: <DetallesDelConsumo />,
  },
]);

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
