import { useEffect } from 'react'
import { useRegisterMutation } from '../../store/apis/userApi';
import { useForm } from '../../hooks/useForm';



export const Register = () => {

  const [createRegister, { isLoading, isError, data, error }] = useRegisterMutation();

  const { name, email, password, onInputChange } = useForm({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);

    try {
      // Envías los datos al body de la mutation
      const res = await createRegister({ name, email, password }).unwrap();

      // Guardas el token si viene en la respuesta
      if (res.token) {
        localStorage.setItem('token', JSON.stringify(res.token));
        console.log('Token guardado:', res.token);
      }
    } catch (err) {
      console.error('Error en el registro:', err);
    }
  };

  return (
    <div className="">
      <form
        className="w-md flex justify-between flex-col shadow-xl/20 gap-5 bg-cyan-800 p-5 rounded-2xl "
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
        {isError && <div>Error: {error?.data?.message || error?.error}</div>}
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      </form>
    </div>
  );

}
