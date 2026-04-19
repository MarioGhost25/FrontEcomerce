import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import { PrivateRoute } from '../components/PrivateRoute';
import RouteLoader from '../components/common/RouteLoader';

// App principal
const App = lazy(() => import('../App'));
const User = lazy(() => import('../features/auth/pages/UserPage').then((module) => ({ default: module.User })));

// Feature: Auth
const ChangePassword = lazy(() => import('../features/auth').then((module) => ({ default: module.ChangePassword })));

// Feature: Shop (Tienda pública)
const HomePage = lazy(() => import('../features/shop/pages/HomePage'));
const ProductsPage = lazy(() => import('../features/product/pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('../features/product/pages/ProductDetailPage'));
const CartPage = lazy(() => import('../features/shop/pages/CartPage'));

// Feature: Admin - Layout
const AdminLayout = lazy(() => import('../features/admin/components/layout/AdminLayout'));

// Feature: Admin - Pages
const DashboardPage = lazy(() => import('../features/admin/pages/DashboardPage'));
const UserProfilesPage = lazy(() => import('../features/admin/pages/UserProfilesPage'));
const CustomerManagementPage = lazy(() => import('../features/admin/pages/CustomerManagementPage'));
const ProductManagementPage = lazy(() => import('../features/admin/pages/ProductManagementPage'));
const CategoryManagementPage = lazy(() => import('../features/admin/pages/CategoryManagementPage'));
const InventoryManagementPage = lazy(() => import('../features/admin/pages/InventoryManagementPage'));
const FormElementsPage = lazy(() => import('../features/admin/pages/FormElementsPage'));
const BasicTablesPage = lazy(() => import('../features/admin/pages/BasicTablesPage'));
const NotFoundPage = lazy(() => import('../features/admin/pages/NotFoundPage'));

// Feature: Admin - Forms
const CustomerForm = lazy(() => import('../features/admin/forms/CustomerForm'));
const ProductForm = lazy(() => import('../features/admin/forms/ProductForm'));
const InventoryForm = lazy(() => import('../features/admin/forms/InventoryForm'));

// Páginas temporales/demo
const FormDemo = lazy(() => import('../pages/FormDemo'));
const CategoryForm = lazy(() => import('../features/admin/forms/CategoryForm'));
const CategoryPage = lazy(() => import('../features/category/pages/CategoryPage').then((module) => ({ default: module.CategoryPage })));

const withSuspense = (element) => (
  <Suspense fallback={<RouteLoader />}>
    {element}
  </Suspense>
);



export const appRouter = createBrowserRouter([
  // --- Rutas Principales de la Tienda/App ---
  {
    path: '/',
    element: withSuspense(<App />) // Layout o página principal de tu tienda
  },
  {
    path: 'user',
    element: withSuspense(<User />)
  },
  {
    path: 'change-password',
    element: withSuspense(<ChangePassword />)
  },
  {
    path: 'products',
    element: withSuspense(<ProductsPage />)
  },
  {
    path: 'category',
    element: withSuspense(<CategoryPage />)

  },
  {
    path: 'product-detail/:id',
    element: withSuspense(<ProductDetailPage />)
  },
  {
    path: 'cart',
    element: withSuspense(<CartPage />)
  },
  

  // --- Sección del Dashboard (Admin) ---
  {
    path: 'dashboard',
    element: withSuspense(<AdminLayout />),
    children: [
      {
        element: <PrivateRoute requireRole='admin' />,
        children: [
          {
            index: true,
            element: withSuspense(<DashboardPage />)
          },
          {
            path: 'profile',
            element: withSuspense(<UserProfilesPage />)
          },
          {
            path: 'basic-tables',
            element: withSuspense(<BasicTablesPage />)
          },
          {
            path: 'form-elements',
            element: withSuspense(<FormElementsPage />)
          },
          {
            path: 'customer-form',
            element: withSuspense(<CustomerForm/>)
          },
          {
            path: 'customer-management',
            element: withSuspense(<CustomerManagementPage />)
          },
          {
            path: 'product-form',
            element: withSuspense(<ProductForm />)
          },
          {
            path: 'category-form',
            element: withSuspense(<CategoryForm />)
          },
          {
            path: 'category-management',
            element: withSuspense(<CategoryManagementPage />)
          },
          {
            path: 'product-management',
            element: withSuspense(<ProductManagementPage />)
          },
          {
            path: 'inven-management',
            element: withSuspense(<InventoryManagementPage />)
          },
          {
            path: 'inven-form',
            element: withSuspense(<InventoryForm />)
          },
          {
            path: 'home-view',
            element: withSuspense(<HomePage/>)
          },
          {
            path: 'product-view',
            element: withSuspense(<ProductsPage/>)
          },
          {
            path: 'error-404',
            element: withSuspense(<NotFoundPage />)
          },
          {
            path: 'form-demo',
            element: withSuspense(<FormDemo />)
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