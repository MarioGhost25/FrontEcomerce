import { useState } from "react";
import Form from "../../../components/form/Form";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import TextArea from "../../../components/form/input/TextArea";
import Select from "../../../components/form/Select";
import PhoneInput from "../../../components/form/group-input/PhoneInput";
import DatePicker from "../../../components/form/date-picker";
import Switch from "../../../components/form/switch/Switch";
import Checkbox from "../../../components/form/input/Checkbox";
import Button from "../../../components/ui/button/Button";

export const CustomerForm = ({ customer = null, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: customer?.firstName || "",
    lastName: customer?.lastName || "",
    email: customer?.email || "",
    phone: customer?.phone || "",
    dateOfBirth: customer?.dateOfBirth || "",
    gender: customer?.gender || "",
    status: customer?.status || "active",
    customerType: customer?.customerType || "individual",
    company: customer?.company || "",
    taxId: customer?.taxId || "",
    address: {
      street: customer?.address?.street || "",
      city: customer?.address?.city || "",
      state: customer?.address?.state || "",
      zipCode: customer?.address?.zipCode || "",
      country: customer?.address?.country || ""
    },
    shippingAddress: {
      street: customer?.shippingAddress?.street || "",
      city: customer?.shippingAddress?.city || "",
      state: customer?.shippingAddress?.state || "",
      zipCode: customer?.shippingAddress?.zipCode || "",
      country: customer?.shippingAddress?.country || ""
    },
    preferences: {
      newsletter: customer?.preferences?.newsletter ?? false,
      smsNotifications: customer?.preferences?.smsNotifications ?? false,
      emailNotifications: customer?.preferences?.emailNotifications ?? true,
      language: customer?.preferences?.language || "en",
      currency: customer?.preferences?.currency || "USD"
    },
    notes: customer?.notes || "",
    tags: customer?.tags || [],
    isVip: customer?.isVip ?? false,
    creditLimit: customer?.creditLimit || 0,
    discountRate: customer?.discountRate || 0
  });

  const [errors, setErrors] = useState({});
  const [useSameAddress, setUseSameAddress] = useState(true);

  const customerStatuses = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "suspended", label: "Suspended" },
    { value: "pending", label: "Pending Verification" }
  ];

  const customerTypes = [
    { value: "individual", label: "Individual" },
    { value: "business", label: "Business" },
    { value: "wholesale", label: "Wholesale" }
  ];

  const genders = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
    { value: "prefer_not_to_say", label: "Prefer not to say" }
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

  const languages = [
    { value: "en", label: "English" },
    { value: "es", label: "Spanish" },
    { value: "fr", label: "French" },
    { value: "de", label: "German" },
    { value: "it", label: "Italian" },
    { value: "pt", label: "Portuguese" },
    { value: "zh", label: "Chinese" },
    { value: "ja", label: "Japanese" }
  ];

  const currencies = [
    { value: "USD", label: "US Dollar (USD)" },
    { value: "EUR", label: "Euro (EUR)" },
    { value: "GBP", label: "British Pound (GBP)" },
    { value: "CAD", label: "Canadian Dollar (CAD)" },
    { value: "AUD", label: "Australian Dollar (AUD)" },
    { value: "JPY", label: "Japanese Yen (JPY)" },
    { value: "CNY", label: "Chinese Yuan (CNY)" }
  ];

  const countryList = [
    { code: "US", label: "+1" },
    { code: "CA", label: "+1" },
    { code: "GB", label: "+44" },
    { code: "DE", label: "+49" },
    { code: "FR", label: "+33" },
    { code: "AU", label: "+61" },
    { code: "JP", label: "+81" },
    { code: "IN", label: "+91" }
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

  const handlePreferenceChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value
      }
    }));
  };

  const handleUseSameAddress = (checked) => {
    setUseSameAddress(checked);
    if (checked) {
      setFormData(prev => ({
        ...prev,
        shippingAddress: { ...prev.address }
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.status) newErrors.status = "Customer status is required";
    if (!formData.customerType) newErrors.customerType = "Customer type is required";
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
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
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {customer ? "Edit Customer" : "Add New Customer"}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {customer ? "Update customer information" : "Create a new customer profile"}
        </p>
      </div>

      <Form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Personal Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                placeholder="John"
                error={!!errors.firstName}
                hint={errors.firstName}
              />
            </div>

            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                placeholder="Doe"
                error={!!errors.lastName}
                hint={errors.lastName}
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="john@example.com"
                error={!!errors.email}
                hint={errors.email}
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <PhoneInput
                countries={countryList}
                onChange={(value) => handleInputChange("phone", value)}
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div>
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <DatePicker
                id="dateOfBirth"
                mode="single"
                onChange={(dates) => handleInputChange("dateOfBirth", dates)}
                placeholder="Select date of birth"
              />
            </div>

            <div>
              <Label htmlFor="gender">Gender</Label>
              <Select
                options={genders}
                placeholder="Select gender"
                onChange={(value) => handleInputChange("gender", value)}
                defaultValue={formData.gender}
              />
            </div>
          </div>
        </div>

        {/* Customer Status & Type */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Customer Status & Type
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <Label htmlFor="status">Customer Status *</Label>
              <Select
                options={customerStatuses}
                placeholder="Select status"
                onChange={(value) => handleInputChange("status", value)}
                defaultValue={formData.status}
              />
            </div>

            <div>
              <Label htmlFor="customerType">Customer Type *</Label>
              <Select
                options={customerTypes}
                placeholder="Select type"
                onChange={(value) => handleInputChange("customerType", value)}
                defaultValue={formData.customerType}
              />
            </div>

            <div>
              <Label htmlFor="company">Company Name</Label>
              <Input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                placeholder="Company Inc."
              />
            </div>

            <div>
              <Label htmlFor="taxId">Tax ID</Label>
              <Input
                type="text"
                id="taxId"
                name="taxId"
                value={formData.taxId}
                onChange={(e) => handleInputChange("taxId", e.target.value)}
                placeholder="123456789"
              />
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Address Information
          </h3>
          
          <div className="space-y-6">
            {/* Primary Address */}
            <div>
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                Primary Address
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <Label htmlFor="street">Street Address</Label>
                  <Input
                    type="text"
                    id="street"
                    name="street"
                    value={formData.address.street}
                    onChange={(e) => handleAddressChange("address", "street", e.target.value)}
                    placeholder="123 Main Street"
                  />
                </div>

                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.address.city}
                    onChange={(e) => handleAddressChange("address", "city", e.target.value)}
                    placeholder="New York"
                  />
                </div>

                <div>
                  <Label htmlFor="state">State/Province</Label>
                  <Input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.address.state}
                    onChange={(e) => handleAddressChange("address", "state", e.target.value)}
                    placeholder="NY"
                  />
                </div>

                <div>
                  <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                  <Input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.address.zipCode}
                    onChange={(e) => handleAddressChange("address", "zipCode", e.target.value)}
                    placeholder="10001"
                  />
                </div>

                <div>
                  <Label htmlFor="country">Country</Label>
                  <Select
                    options={countries}
                    placeholder="Select country"
                    onChange={(value) => handleAddressChange("address", "country", value)}
                    defaultValue={formData.address.country}
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <div className="mb-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={useSameAddress}
                    onChange={(e) => handleUseSameAddress(e.target.checked)}
                    className="rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Same as primary address
                  </span>
                </label>
              </div>

              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                Shipping Address
              </h4>
              
              {!useSameAddress && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <Label htmlFor="shippingStreet">Street Address</Label>
                    <Input
                      type="text"
                      id="shippingStreet"
                      name="shippingStreet"
                      value={formData.shippingAddress.street}
                      onChange={(e) => handleAddressChange("shipping", "street", e.target.value)}
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div>
                    <Label htmlFor="shippingCity">City</Label>
                    <Input
                      type="text"
                      id="shippingCity"
                      name="shippingCity"
                      value={formData.shippingAddress.city}
                      onChange={(e) => handleAddressChange("shipping", "city", e.target.value)}
                      placeholder="New York"
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
                      placeholder="NY"
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
                      placeholder="10001"
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
              )}
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Preferences & Settings
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-md font-medium text-gray-900 dark:text-white">
                Communication Preferences
              </h4>
              
              <div className="space-y-3">
                <Checkbox
                  label="Subscribe to newsletter"
                  checked={formData.preferences.newsletter}
                  onChange={(checked) => handlePreferenceChange("newsletter", checked)}
                />
                
                <Checkbox
                  label="SMS notifications"
                  checked={formData.preferences.smsNotifications}
                  onChange={(checked) => handlePreferenceChange("smsNotifications", checked)}
                />
                
                <Checkbox
                  label="Email notifications"
                  checked={formData.preferences.emailNotifications}
                  onChange={(checked) => handlePreferenceChange("emailNotifications", checked)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-md font-medium text-gray-900 dark:text-white">
                Regional Settings
              </h4>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="language">Preferred Language</Label>
                  <Select
                    options={languages}
                    placeholder="Select language"
                    onChange={(value) => handlePreferenceChange("language", value)}
                    defaultValue={formData.preferences.language}
                  />
                </div>

                <div>
                  <Label htmlFor="currency">Preferred Currency</Label>
                  <Select
                    options={currencies}
                    placeholder="Select currency"
                    onChange={(value) => handlePreferenceChange("currency", value)}
                    defaultValue={formData.preferences.currency}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Business Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Business Settings
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="creditLimit">Credit Limit</Label>
              <Input
                type="number"
                id="creditLimit"
                name="creditLimit"
                value={formData.creditLimit}
                onChange={(e) => handleInputChange("creditLimit", parseFloat(e.target.value))}
                step="0.01"
                placeholder="0.00"
              />
            </div>

            <div>
              <Label htmlFor="discountRate">Discount Rate (%)</Label>
              <Input
                type="number"
                id="discountRate"
                name="discountRate"
                value={formData.discountRate}
                onChange={(e) => handleInputChange("discountRate", parseFloat(e.target.value))}
                step="0.1"
                min="0"
                max="100"
                placeholder="0.0"
              />
            </div>

            <div className="flex items-center">
              <Switch
                label="VIP Customer"
                defaultChecked={formData.isVip}
                onChange={(checked) => handleInputChange("isVip", checked)}
              />
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Customer Notes
          </h3>
          
          <TextArea
            value={formData.notes}
            onChange={(value) => handleInputChange("notes", value)}
            rows={4}
            placeholder="Add any special notes or comments about this customer..."
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
            text={customer ? "Update Customer" : "Create Customer"}
            className="px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors"
          />
        </div>
      </Form>
    </div>
  );
};

export default CustomerForm;
