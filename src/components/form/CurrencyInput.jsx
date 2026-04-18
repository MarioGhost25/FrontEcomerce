import { useState, useEffect } from "react";

const normalizeValue = (val) => {
  const num = parseFloat(val);
  return isNaN(num) ? "" : num.toString();
};

const CurrencyInput = ({
  value = 0,
  onChange,
  currency = "USD",
  placeholder = "0.00",
  className = "",
  disabled = false,
  error = false,
  success = false,
  hint = "",
  id,
  name
}) => {
  const [displayValue, setDisplayValue] = useState(normalizeValue(value));

  useEffect(() => {
    setDisplayValue(normalizeValue(value));
  }, [value]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const handleChange = (e) => {
    const inputValue = e.target.value.replace(/[^0-9.]/g, '');
    setDisplayValue(inputValue);

    if (onChange) {
      const numericValue = inputValue === '' ? 0 : parseFloat(inputValue);
      if (!isNaN(numericValue)) {
        onChange({ target: { name, value: numericValue } });
      }
    }
  };

  const handleBlur = () => {
    const numericValue = parseFloat(displayValue);
    setDisplayValue(isNaN(numericValue) ? "" : numericValue.toFixed(2));
  };
  let inputClasses = `h-11 w-full rounded-lg border appearance-none px-4 py-2.5 pr-12 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${className}`;

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
    <div className="relative">
      <input
        type="text"
        id={id}
        name={name}
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        className={inputClasses}
      />

      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <span className="text-gray-500 dark:text-gray-400 text-sm">
          {currency}
        </span>
      </div>

      {hint && (
        <p className={`mt-1.5 text-xs ${error ? "text-error-500" :
            success ? "text-success-500" :
              "text-gray-500"
          }`}>
          {hint}
        </p>
      )}
    </div>
  );
};

export default CurrencyInput;
