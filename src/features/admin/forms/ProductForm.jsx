import { useState } from "react";
import Form from "../../../components/form/Form";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import TextArea from "../../../components/form/input/TextArea";
import Select from "../../../components/form/Select";
import Switch from "../../../components/form/switch/Switch";
import CurrencyInput from "../../../components/form/CurrencyInput";
import ImageUpload from "../../../components/form/ImageUpload";
import InventoryInput from "../../../components/form/InventoryInput";
import Button from "../../../components/ui/button/Button";
import { useCreateProductMutation } from "../../../api/endpoints/productApi";
import { useForm } from "../../../hooks/useForm";
import { useNavigate } from "react-router";
import { toast } from 'sonner'

const ProductForm = ({ product = null, onCancel }) => {

  const [createProduct, { isLoading }] = useCreateProductMutation();
  const [errors, setErrors] = useState({});
  let navigate = useNavigate();

  const { name, description, price, category, stock, isActive, images, stockStatus, onInputChange, onResetForm } = useForm({
    name: product?.name || "",
    description: '',
    //shortDescription: product?.shortDescription || "",
    price: '',
    //comparePrice: product?.comparePrice || 0,
    //barcode: product?.barcode || "",
    category: '',
    //tags: product?.tags || [],
    stock: product?.stock || 0,
    stockStatus: product?.stockStatus || 'In Stock',
    //weight: product?.weight || 0,
    /*dimensions: {
      length: product?.dimensions?.length || 0,
      width: product?.dimensions?.width || 0,
      height: product?.dimensions?.height || 0
    },*/
    isActive: product?.isActive ?? true,
    //isDigital: product?.isDigital ?? false,
    //requiresShipping: product?.requiresShipping ?? true,
    //trackInventory: product?.trackInventory ?? true,
    //allowBackorder: product?.allowBackorder ?? false,
    images: product?.images || []
  });

  // Derive status from stock to avoid stale form state issues
  const computeStockStatus = (n) => {
    const num = Number(n ?? 0);
    if (num === 0) return 'Out of Stock';
    if (num <= 10) return 'Low Stock';
    return 'In Stock';
  };

  // Función específica para manejar el Switch
  const handleSwitchChange = (fieldName) => (checked) => {
    onInputChange({
      target: {
        name: fieldName,
        value: checked
      }
    });
  };

  const categories = [
    { value: "electronics", label: "Electronics" },
    { value: "clothing", label: "Clothing" },
    { value: "home", label: "Home & Garden" },
    { value: "sports", label: "Sports & Outdoors" },
    { value: "books", label: "Books" },
    { value: "beauty", label: "Beauty & Health" },
    { value: "toys", label: "Toys & Games" },
    { value: "automotive", label: "Automotive" }
  ];


  // const tagOptions = [
  //   { value: "new", text: "New Arrival" },
  //   { value: "sale", text: "On Sale" },
  //   { value: "featured", text: "Featured" },
  //   { value: "bestseller", text: "Bestseller" },
  //   { value: "limited", text: "Limited Edition" },
  //   { value: "eco-friendly", text: "Eco-Friendly" },
  //   { value: "premium", text: "Premium" },
  //   { value: "budget", text: "Budget Friendly" }
  // ];

  // El token lo añade RTK Query vía prepareHeaders; no bloquear el render si falta


  const validateForm = () => {
    const newErrors = {};

    // if (!name.trim()) newErrors.name = "Product name is required";
    // if (!description.trim()) newErrors.description = "Description is required";
    // if (price <= 0) newErrors.price = "Price must be greater than 0";
    // if (!category) newErrors.category = "Category is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const props = {
    name, description, price, category, stock, stockStatus, isActive, images
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name,
      description,
      price,
      category,
      stock: Number(stock),
      isActive,
      images,
      stockStatus: computeStockStatus(stock), // ensure backend gets correct value
    };

    // Debug
    console.log('Estado actual del formulario:', payload);

    try {
      const res = await createProduct(payload).unwrap();
      console.log('Respuesta del servidor:', res)
      navigate('/product-management')
      onResetForm();
    } catch (error) {
      console.error('Error al crear producto:', error);
      toast.error(error?.data?.message || 'Error creating product')
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {product ? "Edit Product" : "Add New Product"}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {product ? "Update product information" : "Create a new product for your store"}
        </p>
      </div>

      <Form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Basic Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={onInputChange}
                placeholder="Enter product name"
                error={!!errors.name}
                hint={errors.name}
              />
            </div>

            {/* <div className="md:col-span-2">
              <Label htmlFor="shortDescription">Short Description</Label>
              <Input
                type="text"
                id="shortDescription"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={(e) => handleInputChange("shortDescription", e.target.value)}
                placeholder="Brief product description"
              />
            </div> */}

            <div className="md:col-span-2">
              <Label htmlFor="description">Description *</Label>
              <TextArea
                id="description"
                name="description"
                value={description}
                onChange={onInputChange}
                rows={4}
                placeholder="Detailed product description"
                error={!!errors.description}
                hint={errors.description}
              />
            </div>
          </div>
        </div>

        {/* Pricing & Inventory */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Pricing & Inventory
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="price">Price *</Label>
              <CurrencyInput
                id="price"
                name="price"
                value={price}
                onChange={onInputChange}
                error={!!errors.price}
                hint={errors.price}
              />
            </div>

            {/* <div>
              <Label htmlFor="comparePrice">Compare at Price</Label>
              <CurrencyInput
                id="comparePrice"
                name="comparePrice"
                value={formData.comparePrice}
                onChange={(value) => handleInputChange("comparePrice", value)}
                hint="Original price to show discount"
              />
            </div> */}


            {/*<div>
              <Label htmlFor="barcode">Barcode</Label>
              <Input
                type="text"
                id="barcode"
                name="barcode"
                value={formData.barcode}
                onChange={(e) => handleInputChange("barcode", e.target.value)}
                placeholder="Product barcode"
              />
            </div> */}

            <div>
              <InventoryInput
                id="stock"
                name="stock"
                value={stock}
                onChange={onInputChange}
                label="Stock Quantity"
                hint={`Status: ${computeStockStatus(stock)}`} // derive from stock
                statusName="stockStatus"
              />
            </div>

            {/* <div>
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={(e) => handleInputChange("weight", parseFloat(e.target.value))}
                step="0.01"
                placeholder="0.00"
              />
            </div> */}
          </div>
        </div>

        {/* Category & Tags */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Category & Tags
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="category">Category *</Label>
              <Select
                id="category"
                name="category"
                options={categories}
                placeholder="Select category"
                onChange={onInputChange}
                defaultValue={category}
                className={errors.category ? "border-error-500" : ""}
              />
              {errors.category && (
                <p className="mt-1 text-xs text-error-500">{errors.category}</p>
              )}
            </div>

            {/* <div>
              <MultiSelect
                label="Product Tags"
                options={tagOptions}
                defaultSelected={formData.tags}
                onChange={(values) => handleInputChange("tags", values)}
              />
            </div> */}
          </div>
        </div>

        {/* Dimensions */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Dimensions (cm)
          </h3>

            <div>
              <Label htmlFor="length">Length</Label>
              <Input
                type="number"
                id="length"
                name="length"
                value={formData.dimensions.length}
                onChange={(e) => handleNestedChange("dimensions", "length", parseFloat(e.target.value))}
                step="0.1"
                placeholder="0.0"
              />
            </div>

            <div>
              <Label htmlFor="width">Width</Label>
              <Input
                type="number"
                id="width"
                name="width"
                value={formData.dimensions.width}
                onChange={(e) => handleNestedChange("dimensions", "width", parseFloat(e.target.value))}
                step="0.1"
                placeholder="0.0"
              />
            </div>

            <div>
              <Label htmlFor="height">Height</Label>
              <Input
                type="number"
                id="height"
                name="height"
                value={formData.dimensions.height}
                onChange={(e) => handleNestedChange("dimensions", "height", parseFloat(e.target.value))}
                step="0.1"
                placeholder="0.0"
              />
            </div>
        </div>
          </div> */}

        {/* Product Images */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Product Images
          </h3>

          <ImageUpload
            onImagesChange={onInputChange}
            maxImages={8}
          />
        </div>

        {/* Product Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Product Settings
          </h3>

          <div className="space-y-4">
            <Switch
              label="Product is active"
              defaultChecked={isActive}
              onChange={handleSwitchChange('isActive')}
            />

            {/* <Switch
              label="Digital product"
              defaultChecked={formData.isDigital}
              onChange={(checked) => handleInputChange("isDigital", checked)}
            />

            <Switch
              label="Requires shipping"
              defaultChecked={formData.requiresShipping}
              onChange={(checked) => handleInputChange("requiresShipping", checked)}
            />

            <Switch
              label="Track inventory"
              defaultChecked={formData.trackInventory}
              onChange={(checked) => handleInputChange("trackInventory", checked)}
            />

            <Switch
              label="Allow backorder"
              defaultChecked={formData.allowBackorder}
              onChange={(checked) => handleInputChange("allowBackorder", checked)}
            /> */}
          </div>
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
            disabled={isLoading}
            text={product ? "Update Product" : "Create Product"}
            className="px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors"
          />
        </div>
      </Form>
    </div>
  );
};

export default ProductForm;
