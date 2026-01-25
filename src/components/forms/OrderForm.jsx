import { useState } from "react";
import Form from "../form/Form";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import TextArea from "../form/input/TextArea";
import Select from "../form/Select";
import CurrencyInput from "../form/CurrencyInput";
import DatePicker from "../form/date-picker";
import Button from "../ui/button/Button";

const OrderForm = ({ order = null, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    orderNumber: order?.orderNumber || "",
    customerId: order?.customerId || "",
    customerName: order?.customerName || "",
    customerEmail: order?.customerEmail || "",
    customerPhone: order?.customerPhone || "",
    status: order?.status || "pending",
    paymentStatus: order?.paymentStatus || "pending",
    paymentMethod: order?.paymentMethod || "",
    subtotal: order?.subtotal || 0,
    tax: order?.tax || 0,
    shipping: order?.shipping || 0,
    discount: order?.discount || 0,
    total: order?.total || 0,
    shippingAddress: {
      firstName: order?.shippingAddress?.firstName || "",
      lastName: order?.shippingAddress?.lastName || "",
      company: order?.shippingAddress?.company || "",
      address1: order?.shippingAddress?.address1 || "",
      address2: order?.shippingAddress?.address2 || "",
      city: order?.shippingAddress?.city || "",
      state: order?.shippingAddress?.state || "",
      zipCode: order?.shippingAddress?.zipCode || "",
      country: order?.shippingAddress?.country || ""
    },
    billingAddress: {
      firstName: order?.billingAddress?.firstName || "",
      lastName: order?.billingAddress?.lastName || "",
      company: order?.billingAddress?.company || "",
      address1: order?.billingAddress?.address1 || "",
      address2: order?.billingAddress?.address2 || "",
      city: order?.billingAddress?.city || "",
      state: order?.billingAddress?.state || "",
      zipCode: order?.billingAddress?.zipCode || "",
      country: order?.billingAddress?.country || ""
    },
    notes: order?.notes || "",
    trackingNumber: order?.trackingNumber || "",
    estimatedDelivery: order?.estimatedDelivery || "",
    items: order?.items || []
  });

  const [errors, setErrors] = useState({});
  const [useSameAddress, setUseSameAddress] = useState(true);

  const orderStatuses = [
    { value: "pending", label: "Pending" },
    { value: "confirmed", label: "Confirmed" },
    { value: "processing", label: "Processing" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" },
    { value: "refunded", label: "Refunded" }
  ];

  const paymentStatuses = [
    { value: "pending", label: "Pending" },
    { value: "paid", label: "Paid" },
    { value: "failed", label: "Failed" },
    { value: "refunded", label: "Refunded" },
    { value: "partially_refunded", label: "Partially Refunded" }
  ];

  const paymentMethods = [
    { value: "credit_card", label: "Credit Card" },
    { value: "debit_card", label: "Debit Card" },
    { value: "paypal", label: "PayPal" },
    { value: "bank_transfer", label: "Bank Transfer" },
    { value: "cash_on_delivery", label: "Cash on Delivery" },
    { value: "cryptocurrency", label: "Cryptocurrency" }
  ];

  const countries = [
    { value: "US", label: "United States" },
    { value: "CA", label: "Canada" },
    { value: "GB", label: "United Kingdom" },
    { value: "DE", label: "Germany" },
    { value: "FR", label: "France" },
    { value: "AU", label: "Australia" },
    { value: "JP", label: "Japan" },
    { value: "IN", label: "India" }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const handleAddressChange = (type, field, value) => {
    setFormData(prev => ({
      ...prev,
      [`${type}Address`]: {
        ...prev[`${type}Address`],
        [field]: value
      }
    }));
  };

  const handleUseSameAddress = (checked) => {
    setUseSameAddress(checked);
    if (checked) {
      setFormData(prev => ({
        ...prev,
        billingAddress: { ...prev.shippingAddress }
      }));
    }
  };

  const calculateTotal = () => {
    const total = formData.subtotal + formData.tax + formData.shipping - formData.discount;
    handleInputChange("total", total);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.orderNumber.trim()) newErrors.orderNumber = "Order number is required";
    if (!formData.customerEmail.trim()) newErrors.customerEmail = "Customer email is required";
    if (!formData.status) newErrors.status = "Order status is required";
    if (!formData.paymentStatus) newErrors.paymentStatus = "Payment status is required";
    if (!formData.shippingAddress.firstName.trim()) newErrors.shippingFirstName = "Shipping first name is required";
    if (!formData.shippingAddress.address1.trim()) newErrors.shippingAddress1 = "Shipping address is required";
    if (!formData.shippingAddress.city.trim()) newErrors.shippingCity = "Shipping city is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {order ? "Edit Order" : "Create New Order"}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {order ? "Update order information" : "Create a new order"}
        </p>
      </div>

      <Form onSubmit={handleSubmit} className="space-y-8">
        {/* Order Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Order Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="orderNumber">Order Number *</Label>
              <Input
                type="text"
                id="orderNumber"
                name="orderNumber"
                value={formData.orderNumber}
                onChange={(e) => handleInputChange("orderNumber", e.target.value)}
                placeholder="ORD-2024-001"
                error={!!errors.orderNumber}
                hint={errors.orderNumber}
              />
            </div>

            <div>
              <Label htmlFor="status">Order Status *</Label>
              <Select
                options={orderStatuses}
                placeholder="Select status"
                onChange={(value) => handleInputChange("status", value)}
                defaultValue={formData.status}
              />
            </div>

            <div>
              <Label htmlFor="trackingNumber">Tracking Number</Label>
              <Input
                type="text"
                id="trackingNumber"
                name="trackingNumber"
                value={formData.trackingNumber}
                onChange={(e) => handleInputChange("trackingNumber", e.target.value)}
                placeholder="1Z999AA1234567890"
              />
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Customer Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                type="text"
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={(e) => handleInputChange("customerName", e.target.value)}
                placeholder="John Doe"
              />
            </div>

            <div>
              <Label htmlFor="customerEmail">Customer Email *</Label>
              <Input
                type="email"
                id="customerEmail"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={(e) => handleInputChange("customerEmail", e.target.value)}
                placeholder="john@example.com"
                error={!!errors.customerEmail}
                hint={errors.customerEmail}
              />
            </div>

            <div>
              <Label htmlFor="customerPhone">Customer Phone</Label>
              <Input
                type="tel"
                id="customerPhone"
                name="customerPhone"
                value={formData.customerPhone}
                onChange={(e) => handleInputChange("customerPhone", e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Payment Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="paymentStatus">Payment Status *</Label>
              <Select
                options={paymentStatuses}
                placeholder="Select payment status"
                onChange={(value) => handleInputChange("paymentStatus", value)}
                defaultValue={formData.paymentStatus}
              />
            </div>

            <div>
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select
                options={paymentMethods}
                placeholder="Select payment method"
                onChange={(value) => handleInputChange("paymentMethod", value)}
                defaultValue={formData.paymentMethod}
              />
            </div>

            <div>
              <Label htmlFor="estimatedDelivery">Estimated Delivery</Label>
              <DatePicker
                id="estimatedDelivery"
                mode="single"
                onChange={(dates) => handleInputChange("estimatedDelivery", dates)}
                placeholder="Select delivery date"
              />
            </div>
          </div>
        </div>

        {/* Order Totals */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Order Totals
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div>
              <Label htmlFor="subtotal">Subtotal</Label>
              <CurrencyInput
                id="subtotal"
                name="subtotal"
                value={formData.subtotal}
                onChange={(value) => {
                  handleInputChange("subtotal", value);
                  calculateTotal();
                }}
              />
            </div>

            <div>
              <Label htmlFor="tax">Tax</Label>
              <CurrencyInput
                id="tax"
                name="tax"
                value={formData.tax}
                onChange={(value) => {
                  handleInputChange("tax", value);
                  calculateTotal();
                }}
              />
            </div>

            <div>
              <Label htmlFor="shipping">Shipping</Label>
              <CurrencyInput
                id="shipping"
                name="shipping"
                value={formData.shipping}
                onChange={(value) => {
                  handleInputChange("shipping", value);
                  calculateTotal();
                }}
              />
            </div>

            <div>
              <Label htmlFor="discount">Discount</Label>
              <CurrencyInput
                id="discount"
                name="discount"
                value={formData.discount}
                onChange={(value) => {
                  handleInputChange("discount", value);
                  calculateTotal();
                }}
              />
            </div>

            <div>
              <Label htmlFor="total">Total</Label>
              <CurrencyInput
                id="total"
                name="total"
                value={formData.total}
                onChange={(value) => handleInputChange("total", value)}
                disabled={true}
                className="bg-gray-50 dark:bg-gray-700"
              />
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Shipping Address
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="shippingFirstName">First Name *</Label>
              <Input
                type="text"
                id="shippingFirstName"
                name="shippingFirstName"
                value={formData.shippingAddress.firstName}
                onChange={(e) => handleAddressChange("shipping", "firstName", e.target.value)}
                error={!!errors.shippingFirstName}
                hint={errors.shippingFirstName}
              />
            </div>

            <div>
              <Label htmlFor="shippingLastName">Last Name</Label>
              <Input
                type="text"
                id="shippingLastName"
                name="shippingLastName"
                value={formData.shippingAddress.lastName}
                onChange={(e) => handleAddressChange("shipping", "lastName", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="shippingCompany">Company</Label>
              <Input
                type="text"
                id="shippingCompany"
                name="shippingCompany"
                value={formData.shippingAddress.company}
                onChange={(e) => handleAddressChange("shipping", "company", e.target.value)}
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="shippingAddress1">Address Line 1 *</Label>
              <Input
                type="text"
                id="shippingAddress1"
                name="shippingAddress1"
                value={formData.shippingAddress.address1}
                onChange={(e) => handleAddressChange("shipping", "address1", e.target.value)}
                error={!!errors.shippingAddress1}
                hint={errors.shippingAddress1}
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="shippingAddress2">Address Line 2</Label>
              <Input
                type="text"
                id="shippingAddress2"
                name="shippingAddress2"
                value={formData.shippingAddress.address2}
                onChange={(e) => handleAddressChange("shipping", "address2", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="shippingCity">City *</Label>
              <Input
                type="text"
                id="shippingCity"
                name="shippingCity"
                value={formData.shippingAddress.city}
                onChange={(e) => handleAddressChange("shipping", "city", e.target.value)}
                error={!!errors.shippingCity}
                hint={errors.shippingCity}
              />
            </div>

            <div>
              <Label htmlFor="shippingState">State/Province</Label>
              <Input
                type="text"
                id="shippingState"
                name="shippingState"
                value={formData.shippingAddress.state}
                onChange={(e) => handleAddressChange("shipping", "state", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="shippingZipCode">ZIP/Postal Code</Label>
              <Input
                type="text"
                id="shippingZipCode"
                name="shippingZipCode"
                value={formData.shippingAddress.zipCode}
                onChange={(e) => handleAddressChange("shipping", "zipCode", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="shippingCountry">Country</Label>
              <Select
                options={countries}
                placeholder="Select country"
                onChange={(value) => handleAddressChange("shipping", "country", value)}
                defaultValue={formData.shippingAddress.country}
              />
            </div>
          </div>
        </div>

        {/* Billing Address */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Billing Address
          </h3>
          
          <div className="mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={useSameAddress}
                onChange={(e) => handleUseSameAddress(e.target.checked)}
                className="rounded border-gray-300 text-brand-600 focus:ring-brand-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Same as shipping address
              </span>
            </label>
          </div>

          {!useSameAddress && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="billingFirstName">First Name</Label>
                <Input
                  type="text"
                  id="billingFirstName"
                  name="billingFirstName"
                  value={formData.billingAddress.firstName}
                  onChange={(e) => handleAddressChange("billing", "firstName", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="billingLastName">Last Name</Label>
                <Input
                  type="text"
                  id="billingLastName"
                  name="billingLastName"
                  value={formData.billingAddress.lastName}
                  onChange={(e) => handleAddressChange("billing", "lastName", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="billingCompany">Company</Label>
                <Input
                  type="text"
                  id="billingCompany"
                  name="billingCompany"
                  value={formData.billingAddress.company}
                  onChange={(e) => handleAddressChange("billing", "company", e.target.value)}
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="billingAddress1">Address Line 1</Label>
                <Input
                  type="text"
                  id="billingAddress1"
                  name="billingAddress1"
                  value={formData.billingAddress.address1}
                  onChange={(e) => handleAddressChange("billing", "address1", e.target.value)}
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="billingAddress2">Address Line 2</Label>
                <Input
                  type="text"
                  id="billingAddress2"
                  name="billingAddress2"
                  value={formData.billingAddress.address2}
                  onChange={(e) => handleAddressChange("billing", "address2", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="billingCity">City</Label>
                <Input
                  type="text"
                  id="billingCity"
                  name="billingCity"
                  value={formData.billingAddress.city}
                  onChange={(e) => handleAddressChange("billing", "city", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="billingState">State/Province</Label>
                <Input
                  type="text"
                  id="billingState"
                  name="billingState"
                  value={formData.billingAddress.state}
                  onChange={(e) => handleAddressChange("billing", "state", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="billingZipCode">ZIP/Postal Code</Label>
                <Input
                  type="text"
                  id="billingZipCode"
                  name="billingZipCode"
                  value={formData.billingAddress.zipCode}
                  onChange={(e) => handleAddressChange("billing", "zipCode", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="billingCountry">Country</Label>
                <Select
                  options={countries}
                  placeholder="Select country"
                  onChange={(value) => handleAddressChange("billing", "country", value)}
                  defaultValue={formData.billingAddress.country}
                />
              </div>
            </div>
          )}
        </div>

        {/* Order Notes */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Order Notes
          </h3>
          
          <TextArea
            value={formData.notes}
            onChange={(value) => handleInputChange("notes", value)}
            rows={4}
            placeholder="Add any special instructions or notes for this order..."
          />
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Button
            type="button"
            text="Cancel"
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            onClick={onCancel}
          />
          <Button
            type="submit"
            text={order ? "Update Order" : "Create Order"}
            className="px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors"
          />
        </div>
      </Form>
    </div>
  );
};

export default OrderForm;
