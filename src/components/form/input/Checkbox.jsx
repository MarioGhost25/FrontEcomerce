import { Check } from "lucide-react";

const Checkbox = ({ label, checked, id, onChange, className = "", disabled = false, }) => {
    return (<label className={`flex items-center space-x-3 group cursor-pointer ${disabled ? "cursor-not-allowed opacity-60" : ""}`}>
      <div className="relative w-5 h-5">
        <input id={id} type="checkbox" className={`w-5 h-5 appearance-none cursor-pointer dark:border-gray-700 border border-gray-300 checked:border-transparent rounded-md checked:bg-brand-500 disabled:opacity-60 
          ${className}`} checked={checked} onChange={(e) => onChange(e.target.checked)} disabled={disabled}/>
        {checked && (<Check className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none top-1/2 left-1/2" width={14} height={14} stroke="white" strokeWidth={1.94437} />)}
        {disabled && (<Check className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none top-1/2 left-1/2" width={14} height={14} stroke="#E4E7EC" strokeWidth={2.33333} />)}
      </div>
      {label && (<span className="text-sm font-medium text-gray-800 dark:text-gray-200">
          {label}
        </span>)}
    </label>);
};
export default Checkbox;
