import { createBrowserRouter, Navigate } from 'react-router';

// Layouts
import AppLayout from '../layout/AppLayout'; // Asegúrate de que la ruta sea correcta

// Componentes y Páginas Principales
import App from '../App';
import { User } from '../components/user';

// Páginas del Dashboard
import Home from '../pages/Admin/Dashboard/Home'; // Asegúrate de que las rutas sean correctas
import UserProfiles from '../pages/Admin/UserProfiles';
import Calendar from '../pages/Admin/Calendar';
import Blank from '../pages/Admin/Blank';
import BasicTables from '../pages/Admin/Tables/BasicTables';
import FormElements from '../pages/Admin/Forms/FormElements';
import NotFound from '../pages/Admin/OtherPage/NotFound';
// ... importa todas las demás páginas del dashboard (FormElements, BasicTables, etc.)

// Páginas de Autenticación
import SignIn from '../pages/Admin/AuthPages/SignIn';
import SignUp from '../pages/Admin/AuthPages/SignUp';
import LineChart from '../pages/Admin/Charts/LineChart';
import BarChart from '../pages/Admin/Charts/BarChart'


export const appRouter = createBrowserRouter([
  // --- Rutas Principales de la Tienda/App ---
  {
    path: '/',
    element: <App /> // Layout o página principal de tu tienda
  },
  {
    path: 'user',
    element: <User />
  },

  // --- Sección del Dashboard ---
  {
    path: 'dashboard',
    element: <AppLayout />, // El layout del dashboard es el elemento principal
    children: [ // Todas las rutas del dashboard van aquí como "hijas"
      {
        index: true, // Esto reemplaza a path="/" dentro del grupo
        element: <Home />
      },
      {
        path: 'profile', // Nota: ya no se usa el '/' al inicio
        element: <UserProfiles />
      },
      {
        path: 'calendar',
        element: <Calendar />
      },
      {
        path: 'blank',
        element: <Blank />
      },
      {
        path: 'basic-tables',
        element: <BasicTables />
      },
      {
        path: 'form-elements',
        element: <FormElements />
      },
      {
        path: 'error-404',
        element: <NotFound />
      },
      {
        path: 'line-chart',
        element: <LineChart />
      },
      {
        path: 'bar-chart',
        element: <BarChart />
      }
    ]
  },

  // --- Rutas de Autenticación (fuera del layout del dashboard) ---
  {
    path: '/signin',
    element: <SignIn />
  },
  {
    path: '/signup',
    element: <SignUp />
  },

  // --- Ruta para cualquier otra URL no encontrada ---
  {
    path: '*',
    element: <Navigate to='/' />
  }
]);