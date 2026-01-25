const Button = ({ 
  children, 
  className = '', 
  onClick, 
  type = 'button',
  variant = 'primary',
  ...props 
}) => {
  const baseStyles = 'flex items-center justify-center rounded-lg transition-all font-bold';
  
  const variants = {
    primary: 'bg-primary hover:bg-primary-dark text-white shadow-lg shadow-cyan-900/20',
    secondary: 'bg-white border border-slate-200 hover:bg-slate-50 text-text-main',
    outline: 'border border-primary text-primary hover:bg-primary hover:text-white',
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

