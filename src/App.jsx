import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Mesa from './pages/mesas';
import Reservas from './pages/Reservas';

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
]);

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
