import { useState } from "react";
import ProductForm from "../features/admin/forms/ProductForm";
import OrderForm from "../features/admin/forms/OrderForm";
import CustomerForm from "../features/admin/forms/CustomerForm";
import InventoryForm from "../features/admin/forms/InventoryForm";
import Button from "../components/ui/button/Button";

export const FormDemo = () => {
  const [activeForm, setActiveForm] = useState(null);

  const handleFormSubmit = (data) => {
    console.log("Form submitted:", data);
    alert("Form submitted successfully! Check console for data.");
    setActiveForm(null);
  };

  const handleFormCancel = () => {
    setActiveForm(null);
  };

  const renderForm = () => {
    switch (activeForm) {
      case "product":
        return (
          <ProductForm
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        );
      case "order":
        return (
          <OrderForm
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        );
      case "customer":
        return (
          <CustomerForm
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        );
      case "inventory":
        return (
          <InventoryForm
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        );
      default:
        return null;
    }
  };

  if (activeForm) {
    return renderForm();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Ecommerce Form System Demo
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Comprehensive forms for managing your ecommerce store
          </p>
        </div>

        {/* Form Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Product Management
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Create and manage products with pricing, inventory, images, and detailed information.
              </p>
              <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
                <p>• Product details & descriptions</p>
                <p>• Pricing & inventory tracking</p>
                <p>• Image upload & management</p>
                <p>• Categories & tags</p>
                <p>• Dimensions & shipping info</p>
              </div>
              <Button
                text="Try Product Form"
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => setActiveForm("product")}
              />
            </div>
          </div>

          {/* Order Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Order Management
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Process orders with customer information, payment details, and shipping addresses.
              </p>
              <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
                <p>• Customer information</p>
                <p>• Order status & tracking</p>
                <p>• Payment processing</p>
                <p>• Shipping & billing addresses</p>
                <p>• Order totals & calculations</p>
              </div>
              <Button
                text="Try Order Form"
                className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                onClick={() => setActiveForm("order")}
              />
            </div>
          </div>

          {/* Customer Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Customer Management
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Manage customer profiles with contact information, preferences, and business settings.
              </p>
              <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
                <p>• Personal & contact details</p>
                <p>• Address management</p>
                <p>• Communication preferences</p>
                <p>• Customer type & status</p>
                <p>• Business settings & limits</p>
              </div>
              <Button
                text="Try Customer Form"
                className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                onClick={() => setActiveForm("customer")}
              />
            </div>
          </div>

          {/* Inventory Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Inventory Management
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Track inventory levels, set reorder points, and manage stock alerts.
              </p>
              <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
                <p>• Stock level tracking</p>
                <p>• Reorder points & quantities</p>
                <p>• Location & warehouse info</p>
                <p>• Cost & pricing management</p>
                <p>• Stock alerts & notifications</p>
              </div>
              <Button
                text="Try Inventory Form"
                className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                onClick={() => setActiveForm("inventory")}
              />
            </div>
          </div>
        </div>

        {/* Features Overview */}
        <div className="mt-16 bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Form System Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Validation & Error Handling
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Built-in form validation with real-time error messages and success states.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Dark Mode Support
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                All forms support both light and dark themes with consistent styling.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Responsive Design
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Mobile-first design that works perfectly on all screen sizes and devices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormDemo;

