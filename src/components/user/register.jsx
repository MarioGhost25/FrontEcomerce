
import { useRegisterMutation } from '../../store/apis/userApi';
import { useForm } from '../../hooks/useForm';
import { toast } from 'react-toastify';



export const Register = () => {

  const [createRegister, { isLoading, error }] = useRegisterMutation();

  const { name, email, password, onInputChange } = useForm({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envías los datos al body de la mutation
      const res = await createRegister({ name, email, password }).unwrap();

      // Guardas el token si viene en la respuesta
      if (res.token) {
        localStorage.setItem('token', JSON.stringify(res.token));
      }

      toast.success('Its created succesfully a user ✅');
    } catch (err) {
      toast.error(error?.data?.message || 'There is an error creating the user ❌')
    }
  };

  return (
    <form
      className="w-[448px] h-[430px] flex flex-col shadow-xl/20 gap-5 bg-cyan-800 p-5 rounded-2xl "
      onSubmit={handleSubmit}
    >
      <label className="font-bold text-amber-100 text-3xl p-5">Register</label>
      <input
        className="p-3 bg-amber-50 rounded-2xl mx-5 outline-none"
        type="text"
        name="name"
        placeholder="Name"
        value={name}
        onChange={onInputChange}
      />
      <input
        className="p-3 bg-amber-50 rounded-2xl mx-5 outline-none"
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={onInputChange}
      />
      <input
        className="p-3 bg-amber-50 rounded-2xl mx-5 outline-none"
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={onInputChange}
      />
      <button className="w-32 p-3 m-5 bg-amber-100" type="submit" disabled={isLoading}>
        Register
      </button>
      {isLoading && <div>Loading...</div>}
      
      
    </form>
  );

}
