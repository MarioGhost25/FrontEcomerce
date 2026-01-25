import { createBrowserRouter, Navigate } from 'react-router';
import { PrivateRoute } from '../components/PrivateRoute';

// Layouts
import AppLayout from '../layout/AppLayout'; // Asegúrate de que la ruta sea correcta

// Componentes y Páginas Principales
import App from '../App';
import { User } from '../components/user';

// Páginas del Dashboard
import Home from '../pages/Admin/Dashboard/Home'; // Asegúrate de que las rutas sean correctas
import UserProfiles from '../pages/Admin/UserProfiles';

import BasicTables from '../pages/Admin/Tables/BasicTables';
import FormElements from '../pages/Admin/Forms/FormElements';
import NotFound from '../pages/Admin/OtherPage/NotFound';
// ... importa todas las demás páginas del dashboard (FormElements, BasicTables, etc.)

// Páginas de Autenticación
import SignIn from '../pages/Admin/AuthPages/SignIn';
import SignUp from '../pages/Admin/AuthPages/SignUp';
import CustomerManagement from '../pages/Admin/CustomerManagement';
import ProductManagement from '../pages/Admin/ProductManagement';
import InventoryManagement from '../pages/Admin/InventoryManagement';
import FormDemo from '../pages/FormDemo';

import CustomerForm from '../components/forms/CustomerForm';
import ProductForm from '../components/forms/ProductForm';
import InventoryForm from '../components/forms/InventoryForm';
import { Changepass } from '../components/auth/Changepass';
import Products from '../pages/Products';
import ProductDetail from '../pages/ProductDetail';
import Cart from '../pages/Cart';



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
  {
    path: 'change-password',
    element: <Changepass />
  },
  {
    path: 'products',
    element: <Products />
  },
  {
    path: 'product-detail',
    element: <ProductDetail />
  },
  {
    path: 'cart',
    element: <Cart />
  },
  

  // --- Sección del Dashboard ---
  {
    path: 'dashboard',
    element: <AppLayout />,
    children: [
      {
        element: <PrivateRoute requireRole='admin' />,
        children: [
          {
            index: true, // Esto reemplaza a path="/" dentro del grupo
            element: <Home />
          },
          {
            path: 'profile', // Nota: ya no se usa el '/' al inicio
            element: <UserProfiles />
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
            path: 'customer-form',
            element: <CustomerForm/>
          },
          {
            path: 'customer-management',
            element: <CustomerManagement />
          },
          {
            path: 'product-form',
            element: <ProductForm />
          },
          {
            path: 'product-management',
            element: <ProductManagement />
          },
          {
            path: 'inven-management',
            element: <InventoryManagement />
          },
          {
            path: 'inven-form',
            element: <InventoryForm />
          },
          {
            path: 'error-404',
            element: <NotFound />
          },
          {
            path: 'form-demo',
            element: <FormDemo />

          },
          
        ]
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