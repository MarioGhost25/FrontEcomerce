import { useState } from "react";
import Form from "../../../components/form/Form";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import Select from "../../../components/form/Select";
import InventoryInput from "../../../components/form/InventoryInput";
import DatePicker from "../../../components/form/date-picker";
import Switch from "../../../components/form/switch/Switch";
import Button from "../../../components/ui/button/Button";
import { CircleX, Info, TriangleAlert } from "lucide-react";

export const InventoryForm = ({ inventory = null, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    productId: inventory?.productId || "",
    productName: inventory?.productName || "",
    sku: inventory?.sku || "",
    barcode: inventory?.barcode || "",
    currentStock: inventory?.currentStock || 0,
    reservedStock: inventory?.reservedStock || 0,
    availableStock: inventory?.availableStock || 0,
    minStockLevel: inventory?.minStockLevel || 0,
    maxStockLevel: inventory?.maxStockLevel || 1000,
    reorderPoint: inventory?.reorderPoint || 10,
    reorderQuantity: inventory?.reorderQuantity || 50,
    costPrice: inventory?.costPrice || 0,
    sellingPrice: inventory?.sellingPrice || 0,
    location: inventory?.location || "",
    warehouse: inventory?.warehouse || "",
    supplier: inventory?.supplier || "",
    batchNumber: inventory?.batchNumber || "",
    expiryDate: inventory?.expiryDate || "",
    lastRestocked: inventory?.lastRestocked || "",
    trackInventory: inventory?.trackInventory ?? true,
    allowNegativeStock: inventory?.allowNegativeStock ?? false,
    autoReorder: inventory?.autoReorder ?? false,
    status: inventory?.status || "active",
    notes: inventory?.notes || ""
  });

  const [errors, setErrors] = useState({});

  const inventoryStatuses = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "discontinued", label: "Discontinued" },
    { value: "out_of_stock", label: "Out of Stock" }
  ];

  const warehouses = [
    { value: "main", label: "Main Warehouse" },
    { value: "secondary", label: "Secondary Warehouse" },
    { value: "returns", label: "Returns Warehouse" },
    { value: "damaged", label: "Damaged Goods" }
  ];

  const locations = [
    { value: "A-01", label: "A-01" },
    { value: "A-02", label: "A-02" },
    { value: "B-01", label: "B-01" },
    { value: "B-02", label: "B-02" },
    { value: "C-01", label: "C-01" },
    { value: "C-02", label: "C-02" }
  ];

  const suppliers = [
    { value: "supplier1", label: "ABC Suppliers" },
    { value: "supplier2", label: "XYZ Corporation" },
    { value: "supplier3", label: "Global Imports" },
    { value: "supplier4", label: "Local Distributors" }
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

  const calculateAvailableStock = () => {
    const available = formData.currentStock - formData.reservedStock;
    handleInputChange("availableStock", Math.max(0, available));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.productId.trim()) newErrors.productId = "Product ID is required";
    if (!formData.sku.trim()) newErrors.sku = "SKU is required";
    if (formData.currentStock < 0) newErrors.currentStock = "Stock cannot be negative";
    if (formData.minStockLevel < 0) newErrors.minStockLevel = "Minimum stock level cannot be negative";
    if (formData.maxStockLevel <= formData.minStockLevel) {
      newErrors.maxStockLevel = "Maximum stock must be greater than minimum stock";
    }
    if (formData.reorderPoint < 0) newErrors.reorderPoint = "Reorder point cannot be negative";
    if (formData.reorderQuantity <= 0) newErrors.reorderQuantity = "Reorder quantity must be greater than 0";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const getStockStatus = () => {
    if (formData.currentStock === 0) return { status: "Out of Stock", color: "text-red-500", bg: "bg-red-50 dark:bg-red-900/20" };
    if (formData.currentStock <= formData.reorderPoint) return { status: "Low Stock", color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-900/20" };
    if (formData.currentStock >= formData.maxStockLevel) return { status: "Overstocked", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" };
    return { status: "In Stock", color: "text-green-500", bg: "bg-green-50 dark:bg-green-900/20" };
  };

  const stockStatus = getStockStatus();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {inventory ? "Edit Inventory" : "Add Inventory Item"}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {inventory ? "Update inventory information" : "Add a new item to inventory"}
        </p>
      </div>

      <Form onSubmit={handleSubmit} className="space-y-8">
        {/* Product Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Product Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="productId">Product ID *</Label>
              <Input
                type="text"
                id="productId"
                name="productId"
                value={formData.productId}
                onChange={(e) => handleInputChange("productId", e.target.value)}
                placeholder="PROD-001"
                error={!!errors.productId}
                hint={errors.productId}
              />
            </div>

            <div>
              <Label htmlFor="productName">Product Name</Label>
              <Input
                type="text"
                id="productName"
                name="productName"
                value={formData.productName}
                onChange={(e) => handleInputChange("productName", e.target.value)}
                placeholder="Product Name"
              />
            </div>

            <div>
              <Label htmlFor="sku">SKU *</Label>
              <Input
                type="text"
                id="sku"
                name="sku"
                value={formData.sku}
                onChange={(e) => handleInputChange("sku", e.target.value)}
                placeholder="SKU-001"
                error={!!errors.sku}
                hint={errors.sku}
              />
            </div>

            <div>
              <Label htmlFor="barcode">Barcode</Label>
              <Input
                type="text"
                id="barcode"
                name="barcode"
                value={formData.barcode}
                onChange={(e) => handleInputChange("barcode", e.target.value)}
                placeholder="123456789012"
              />
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                options={inventoryStatuses}
                placeholder="Select status"
                onChange={(value) => handleInputChange("status", value)}
                defaultValue={formData.status}
              />
            </div>

            <div className="flex items-center">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${stockStatus.bg}`}>
                <span className={stockStatus.color}>
                  {stockStatus.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stock Levels */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Stock Levels
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <InventoryInput
                id="currentStock"
                name="currentStock"
                value={formData.currentStock}
                onChange={(value) => {
                  handleInputChange("currentStock", value);
                  calculateAvailableStock();
                }}
                label="Current Stock"
                error={!!errors.currentStock}
                hint={errors.currentStock}
              />
            </div>

            <div>
              <Label htmlFor="reservedStock">Reserved Stock</Label>
              <Input
                type="number"
                id="reservedStock"
                name="reservedStock"
                value={formData.reservedStock}
                onChange={(e) => {
                  handleInputChange("reservedStock", parseInt(e.target.value) || 0);
                  calculateAvailableStock();
                }}
                min="0"
                placeholder="0"
              />
            </div>

            <div>
              <Label htmlFor="availableStock">Available Stock</Label>
              <Input
                type="number"
                id="availableStock"
                name="availableStock"
                value={formData.availableStock}
                disabled={true}
                className="bg-gray-50 dark:bg-gray-700"
                placeholder="0"
              />
            </div>

            <div>
              <Label htmlFor="minStockLevel">Minimum Stock Level</Label>
              <Input
                type="number"
                id="minStockLevel"
                name="minStockLevel"
                value={formData.minStockLevel}
                onChange={(e) => handleInputChange("minStockLevel", parseInt(e.target.value) || 0)}
                min="0"
                placeholder="0"
                error={!!errors.minStockLevel}
                hint={errors.minStockLevel}
              />
            </div>

            <div>
              <Label htmlFor="maxStockLevel">Maximum Stock Level</Label>
              <Input
                type="number"
                id="maxStockLevel"
                name="maxStockLevel"
                value={formData.maxStockLevel}
                onChange={(e) => handleInputChange("maxStockLevel", parseInt(e.target.value) || 0)}
                min="1"
                placeholder="1000"
                error={!!errors.maxStockLevel}
                hint={errors.maxStockLevel}
              />
            </div>

            <div>
              <Label htmlFor="reorderPoint">Reorder Point</Label>
              <Input
                type="number"
                id="reorderPoint"
                name="reorderPoint"
                value={formData.reorderPoint}
                onChange={(e) => handleInputChange("reorderPoint", parseInt(e.target.value) || 0)}
                min="0"
                placeholder="10"
                error={!!errors.reorderPoint}
                hint={errors.reorderPoint}
              />
            </div>

            <div>
              <Label htmlFor="reorderQuantity">Reorder Quantity</Label>
              <Input
                type="number"
                id="reorderQuantity"
                name="reorderQuantity"
                value={formData.reorderQuantity}
                onChange={(e) => handleInputChange("reorderQuantity", parseInt(e.target.value) || 0)}
                min="1"
                placeholder="50"
                error={!!errors.reorderQuantity}
                hint={errors.reorderQuantity}
              />
            </div>

            <div>
              <Label htmlFor="lastRestocked">Last Restocked</Label>
              <DatePicker
                id="lastRestocked"
                mode="single"
                onChange={(dates) => handleInputChange("lastRestocked", dates)}
                placeholder="Select date"
              />
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Pricing Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="costPrice">Cost Price</Label>
              <Input
                type="number"
                id="costPrice"
                name="costPrice"
                value={formData.costPrice}
                onChange={(e) => handleInputChange("costPrice", parseFloat(e.target.value) || 0)}
                step="0.01"
                min="0"
                placeholder="0.00"
              />
            </div>

            <div>
              <Label htmlFor="sellingPrice">Selling Price</Label>
              <Input
                type="number"
                id="sellingPrice"
                name="sellingPrice"
                value={formData.sellingPrice}
                onChange={(e) => handleInputChange("sellingPrice", parseFloat(e.target.value) || 0)}
                step="0.01"
                min="0"
                placeholder="0.00"
              />
            </div>
          </div>
        </div>

        {/* Location & Supplier */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Location & Supplier Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <Label htmlFor="warehouse">Warehouse</Label>
              <Select
                options={warehouses}
                placeholder="Select warehouse"
                onChange={(value) => handleInputChange("warehouse", value)}
                defaultValue={formData.warehouse}
              />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Select
                options={locations}
                placeholder="Select location"
                onChange={(value) => handleInputChange("location", value)}
                defaultValue={formData.location}
              />
            </div>

            <div>
              <Label htmlFor="supplier">Supplier</Label>
              <Select
                options={suppliers}
                placeholder="Select supplier"
                onChange={(value) => handleInputChange("supplier", value)}
                defaultValue={formData.supplier}
              />
            </div>

            <div>
              <Label htmlFor="batchNumber">Batch Number</Label>
              <Input
                type="text"
                id="batchNumber"
                name="batchNumber"
                value={formData.batchNumber}
                onChange={(e) => handleInputChange("batchNumber", e.target.value)}
                placeholder="BATCH-001"
              />
            </div>

            <div>
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <DatePicker
                id="expiryDate"
                mode="single"
                onChange={(dates) => handleInputChange("expiryDate", dates)}
                placeholder="Select expiry date"
              />
            </div>
          </div>
        </div>

        {/* Inventory Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Inventory Settings
          </h3>
          
          <div className="space-y-4">
            <Switch
              label="Track inventory"
              defaultChecked={formData.trackInventory}
              onChange={(checked) => handleInputChange("trackInventory", checked)}
            />
            
            <Switch
              label="Allow negative stock"
              defaultChecked={formData.allowNegativeStock}
              onChange={(checked) => handleInputChange("allowNegativeStock", checked)}
            />
            
            <Switch
              label="Auto reorder"
              defaultChecked={formData.autoReorder}
              onChange={(checked) => handleInputChange("autoReorder", checked)}
            />
          </div>
        </div>

        {/* Stock Alerts */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Stock Alerts
          </h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Info className="h-5 w-5 text-blue-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>Reorder Alert:</strong> When stock falls below {formData.reorderPoint} units
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <TriangleAlert className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    <strong>Low Stock Alert:</strong> When stock falls below {formData.minStockLevel} units
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CircleX className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700 dark:text-red-300">
                    <strong>Out of Stock Alert:</strong> When stock reaches 0 units
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Inventory Notes
          </h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="notes">Notes</Label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden focus:ring-3 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                placeholder="Add any special notes about this inventory item..."
              />
            </div>
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
            text={inventory ? "Update Inventory" : "Add to Inventory"}
            className="px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors"
          />
        </div>
      </Form>
    </div>
  );
};

export default InventoryForm;
