

export const Input = ({ className, type, name, placeholder, value, onChange }) => {
    return (
        <input
            className={className}
            type={type}            
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    )
}
