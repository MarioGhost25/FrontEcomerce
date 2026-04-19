import { useRef, useState } from "react";
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
import { useCreateProductMutation, useUpdateProductMutation, useUploadProductImageMutation } from "../../../api/endpoints/productApi";
import { useForm } from "../../../hooks/useForm";
import { useNavigate } from "react-router";
import { toast } from 'sonner'
import { useGetAllCategoriesQuery } from "../../../api/endpoints/categoryApi";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().trim().min(1, "Product name is required"),
  description: z.string().trim().min(1, "Description is required"),
  originalPrice: z.coerce.number().positive("Price must be greater than 0"),
  price: z.coerce.number().positive("Price must be greater than 0"),
  category: z.string().trim().min(1, "Category is required"),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
});

const computeStockStatus = (stock, lowStockThreshold = 10) => {
  if (stock === 0) return "Out of Stock";
  if (stock <= lowStockThreshold) return "Low Stock";
  return "In Stock";
};

const ProductForm = ({ product = null, onCancel }) => {

  const countTextRef = useRef(0)
  const [countText, setCountText] = useState(0)

  const [errors, setErrors] = useState({});
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [uploadProductImage] = useUploadProductImageMutation();
  const { data } = useGetAllCategoriesQuery();
  let navigate = useNavigate();

  const { name, description, longDescription, originalPrice, price, category, stock, isActive, images, onInputChange, onResetForm } = useForm({
    name: product?.name || "",
    longDescription: product?.longDescription || "",
    description: product?.description || "",
    originalPrice: Number(product?.originalPrice) || 0,  // ← Number() en lugar de solo || 0
    price: Number(product?.price) || 0,
    stock: Number(product?.stock) || 0,
    //comparePrice: product?.comparePrice || 0,
    //barcode: product?.barcode || "",
    category: product?.category || "",
    //tags: product?.tags || [],
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

  const categories = data?.map(cat => ({ value: cat.id, label: cat.name })) || [];


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
  const handleImagesChange = (updatedImages) => {
    onInputChange({ target: { name: 'images', value: updatedImages } });
  };

  const handleIsActiveChange = (value) => {
    onInputChange({ target: { name: 'isActive', value } });
  };

  const handleTextAreaChange = (e) => {
    const { value } = e.target;
    const count = value.length;
    setCountText(count);
    onInputChange(e);
  }



  const uploadImageAndGetUrl = async (img) => {
    // Si ya es URL (ej: edición)
    if (typeof img === 'string') {
      return img;
    }

    const file = img?.file ?? img;

    if (!(file instanceof File)) {
      return null;
    }

    const formData = new FormData();
    formData.append("file", file);

    const uploadResponse = await uploadProductImage(formData).unwrap();
    const imageUrl = uploadResponse?.url;

    if (!imageUrl) {
      throw new Error('No se obtuvo URL de la imagen');
    }

    return imageUrl;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = productSchema.safeParse({
      name,
      description,
      category,
      stock,
      price: Number(price),           // ← agregar
      originalPrice: Number(originalPrice),
    });

    if (!validation.success) {
      const formErrors = validation.error.issues.reduce((acc, issue) => {
        const field = issue.path[0];
        if (typeof field === "string" && !acc[field]) {
          acc[field] = issue.message;
        }
        return acc;
      }, {});

      setErrors(formErrors);
      return;
    }

    setErrors({});

    try {
      const uploadedImageUrls = (
        await Promise.all((images || []).map((img) => uploadImageAndGetUrl(img)))
      ).filter(Boolean);

      const payload = {
        id: product?.id.toString(),
        name: validation.data.name,
        description: validation.data.description,
        longDescription: longDescription,
        originalPrice: Number(originalPrice),   // ← forzar conversión aquí
        price: Number(price),
        category: validation.data.category,
        stock: validation.data.stock,
        isActive,
        images: uploadedImageUrls,
        stockStatus: computeStockStatus(validation.data.stock),
      };

      if (!product) {
        await createProduct(payload).unwrap();
        onResetForm();
        toast.success("Product created successfully");
        navigate("/dashboard/product-management");
        return;
      }

      await updateProduct(payload).unwrap();
      navigate("/dashboard/product-management");
      toast.success("Product updated successfully");
    } catch (error) {
      console.error("Error al crear producto:", error);
      toast.error(error?.data?.message || error?.message || "Error creating product");
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

            <div className="md:col-span-2">
              <Label htmlFor="description">Description *</Label>
              <Input
                type="text"
                id="description"
                name="description"
                value={description}
                onChange={onInputChange}
                placeholder="Brief product description"
                error={!!errors.description}
                hint={errors.description}
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="longDescription">Long Description</Label>
              <TextArea
                id="longDescription"
                name="longDescription"
                value={longDescription}
                ref={countTextRef}
                onChange={handleTextAreaChange}
                rows={4}
                placeholder="Detailed product description"
                error={!!errors.longDescription}
                hint={errors.longDescription}
              />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {countText > 200 ? <span className="text-red-500">{countText}/200 characters</span> : <span className="text-gray-500">{countText}/200 characters</span>}
              </p>
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
              <Label htmlFor="originalPrice">Original Price *</Label>
              <CurrencyInput
                id="originalPrice"
                name="originalPrice"
                value={originalPrice}
                onChange={onInputChange}
                error={!!errors.originalPrice}
                hint={errors.originalPrice}
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
                hint={`Status: ${computeStockStatus(Number(stock) || 0)}`}
                statusName="stockStatus"
              />
            </div>

            <div>
              <Label htmlFor="price">Price </Label>
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
            onImagesChange={handleImagesChange}
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
              onChange={handleIsActiveChange}
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
