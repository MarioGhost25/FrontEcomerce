
export const Button = ({ className, type, text, disabled}) => {
  return (
    <button className={className} type={type} disabled={disabled}>
        {text}
    </button>
  )
};
