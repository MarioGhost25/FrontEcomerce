import { useState, useEffect } from "react";

const InventoryInput = ({ 
  value = 0, 
  onChange, 
  min = 0,
  max = 9999,
  className = "",
  disabled = false,
  error = false,
  success = false,
  hint = "",
  id,
  name,
  label = "Stock Quantity",
  statusName,            // NEW: field name to emit stockStatus into parent form
  lowStockThreshold = 10 // NEW: configurable threshold, default 10
}) => {

  const [stock, setStock] = useState(String(value ?? 0));

  useEffect(() => {
    setStock(String(value ?? 0));
  }, [value]);

  const parseToNumber = (str) => {
    const n = parseInt(str, 10);
    return Number.isNaN(n) ? 0 : n;
  };
  
  const clamp = (n) => Math.min(Math.max(n, Number(min)), Number(max));
  const numericStock = parseToNumber(stock);

  const emitChange = (val) => {
    if (onChange) {
      onChange({ target: { name, value: val } });
    }
  };

  const emitChangeStatus = (statusVal) => {
    if (onChange && statusName) {
      onChange({ target: { name: statusName, value: statusVal } });
    }
  };

  const computeStatusText = (n) => {
    if (n === 0) return 'Out of Stock';
    if (n <= lowStockThreshold) return 'Low Stock';
    return 'In Stock';
  };

  const handleStockChange = (e) => {
    const inputVal = e.target.value;
    setStock(inputVal);

    if (inputVal === "") return; // Permitir campo vacío mientras se escribe

    const newValue = clamp(parseToNumber(inputVal));
    // Emit status first, stock last
    emitChangeStatus(computeStatusText(newValue));
    emitChange(newValue);
  };

  const handleBlur = () => {
    const newValue = clamp(parseToNumber(stock));
    setStock(String(newValue));
    // Emit status first, stock last
    emitChangeStatus(computeStatusText(newValue));
    emitChange(newValue);
  };

  const statusText = computeStatusText(numericStock);
  const uiClasses =
    numericStock === 0
      ? { color: "text-red-500", bg: "bg-red-50 dark:bg-red-900/20" }
      : numericStock <= lowStockThreshold
      ? { color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-900/20" }
      : { color: "text-green-500", bg: "bg-green-50 dark:bg-green-900/20" };

  let inputClasses = `h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${className}`;
  
  if (disabled) {
    inputClasses += ` text-gray-500 border-gray-300 opacity-40 bg-gray-100 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`;
  } else if (error) {
    inputClasses += ` border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:text-error-400 dark:border-error-500 dark:focus:border-error-800`;
  } else if (success) {
    inputClasses += ` border-success-500 focus:border-success-300 focus:ring-success-500/20 dark:text-success-400 dark:border-success-500 dark:focus:border-success-800`;
  } else {
    inputClasses += ` bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-800`;
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-400">
          {label}
        </label>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${uiClasses.bg}`}>
          <span className={uiClasses.color}>
            {statusText}
          </span>
        </div>
      </div>
      
      <input
        type="number"
        id={id}
        name={name}
        value={stock}
        onChange={handleStockChange}
        onBlur={handleBlur}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleBlur();
          }
        }}
        min={min}
        max={max}
        disabled={disabled}
        className={inputClasses}
      />

      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>Min: {min} | Max: {max}</span>
        <span>Low stock threshold: {lowStockThreshold}</span>
      </div>

      {hint && (
        <p className={`text-xs ${
          error ? "text-error-500" : 
          success ? "text-success-500" : 
          "text-gray-500"
        }`}>
          {hint}
        </p>
      )}
    </div>
  );
};

export default InventoryInput;
