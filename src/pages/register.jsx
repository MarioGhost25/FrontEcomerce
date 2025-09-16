
import { useRegisterMutation } from '../store/apis/userApi';
import { useForm } from '../hooks/useForm';
import { toast } from 'react-toastify';
import { Input } from '../components/Input';
import { Form } from '../components/form';
import { Label } from '../components/Label';
import { Button } from '../components/Button';




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
    <Form
      className='w-[448px] h-[430px] flex flex-col shadow-xl/20 gap-5 bg-cyan-800 p-5 rounded-2xl'
      handleSubmit={handleSubmit}
    >
      <Label className="font-bold text-amber-100 text-3xl p-5" title={'Register'}>
      </Label>
      <Input
        className="p-3 bg-amber-50 rounded-2xl mx-5 outline-none"
        type="text"
        name="name"
        placeholder="Name"
        value={name}
        onChange={onInputChange}
      />
      <Input
        className="p-3 bg-amber-50 rounded-2xl mx-5 outline-none"
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={onInputChange}
      />
      <Input
        className="p-3 bg-amber-50 rounded-2xl mx-5 outline-none"
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={onInputChange}
      />
      <Button className="w-32 p-3 m-5 bg-amber-100" type="submit" disabled={isLoading} text="Register">
      </Button>
    </Form >

  );

}
