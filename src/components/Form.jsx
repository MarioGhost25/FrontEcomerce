



export const Form = ({ handleSubmit, className, children }) => {
  return (
    <form
      className={className}
      onSubmit={handleSubmit}
    >
      {children}
    </form>
  )
}
