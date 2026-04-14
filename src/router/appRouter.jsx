import { createBrowserRouter, Navigate } from 'react-router';
import { PrivateRoute } from '../components/PrivateRoute';

// App principal
import App from '../App';
import { User } from '../features/auth/pages/UserPage';

// Feature: Auth
import { ChangePassword } from '../features/auth';

// Feature: Shop (Tienda pública)
import HomePage from '../features/shop/pages/HomePage';
import ProductsPage from '../features/product/pages/ProductsPage';
import ProductDetailPage from '../features/product/pages/ProductDetailPage';
import CartPage from '../features/shop/pages/CartPage';

// Feature: Admin - Layout
import AdminLayout from '../features/admin/components/layout/AdminLayout';

// Feature: Admin - Pages
import DashboardPage from '../features/admin/pages/DashboardPage';
import UserProfilesPage from '../features/admin/pages/UserProfilesPage';
import CustomerManagementPage from '../features/admin/pages/CustomerManagementPage';
import ProductManagementPage from '../features/admin/pages/ProductManagementPage';
import CategoryManagementPage from '../features/admin/pages/CategoryManagementPage';
import InventoryManagementPage from '../features/admin/pages/InventoryManagementPage';
import FormElementsPage from '../features/admin/pages/FormElementsPage';
import BasicTablesPage from '../features/admin/pages/BasicTablesPage';
import NotFoundPage from '../features/admin/pages/NotFoundPage';

// Feature: Admin - Forms
import CustomerForm from '../features/admin/forms/CustomerForm';
import ProductForm from '../features/admin/forms/ProductForm';
import InventoryForm from '../features/admin/forms/InventoryForm';

// Páginas temporales/demo
import FormDemo from '../pages/FormDemo';
import CategoryForm from '../features/admin/forms/CategoryForm';
import { CategoryPage } from '../features/category/pages/CategoryPage';



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
    element: <ChangePassword />
  },
  {
    path: 'products',
    element: <ProductsPage />
  },
  {
    path: 'category',
    element: <CategoryPage />

  },
  {
    path: 'product-detail/:id',
    element: <ProductDetailPage />
  },
  {
    path: 'cart',
    element: <CartPage />
  },
  

  // --- Sección del Dashboard (Admin) ---
  {
    path: 'dashboard',
    element: <AdminLayout />,
    children: [
      {
        element: <PrivateRoute requireRole='admin' />,
        children: [
          {
            index: true,
            element: <DashboardPage />
          },
          {
            path: 'profile',
            element: <UserProfilesPage />
          },
          {
            path: 'basic-tables',
            element: <BasicTablesPage />
          },
          {
            path: 'form-elements',
            element: <FormElementsPage />
          },
          {
            path: 'customer-form',
            element: <CustomerForm/>
          },
          {
            path: 'customer-management',
            element: <CustomerManagementPage />
          },
          {
            path: 'product-form',
            element: <ProductForm />
          },
          {
            path: 'category-form',
            element: <CategoryForm />
          },
          {
            path: 'category-management',
            element: <CategoryManagementPage />
          },
          {
            path: 'product-management',
            element: <ProductManagementPage />
          },
          {
            path: 'inven-management',
            element: <InventoryManagementPage />
          },
          {
            path: 'inven-form',
            element: <InventoryForm />
          },
          {
            path: 'home-view',
            element: <HomePage/>
          },
          {
            path: 'product-view',
            element: <ProductsPage/>
          },
          {
            path: 'error-404',
            element: <NotFoundPage />
          },
          {
            path: 'form-demo',
            element: <FormDemo />
          },
        ]
      }
    ]
  },
  // --- Ruta para cualquier otra URL no encontrada ---
  {
    path: '*',
    element: <Navigate to='/' />
  }
]);