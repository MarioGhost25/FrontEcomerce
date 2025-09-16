
import { useForm } from "../hooks/useForm";
import { useLoginMutation } from "../store/apis/userApi";
import { toast } from "react-toastify";
import { Input } from "../components/Input";
import { Form } from "../components/form";
import { Label } from "../components/Label";
import { Button } from '../components/Button';


export const Login = () => {

    const [loginUser, { data, isLoading, hasError, response }] = useLoginMutation();

    const { email, password, onInputChange } = useForm({
        email: '',
        password: '',
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await loginUser({ email, password }).unwrap();

            toast.success('Inicio de sesión exitoso ✅');

        } catch (error) {
            toast.error(error?.data?.message || 'Error al iniciar sesión❌')
        }

    }

    return (
        <Form
            className='w-[448px] h-[350px] flex flex-col shadow-xl/20 gap-5 bg-cyan-800 p-5 rounded-2xl'
            handleSubmit={handleSubmit}
        >
            <Label className="font-bold text-amber-100 text-3xl p-5" 
            title="Login"
            >
            </Label>
                
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
            <Button className="w-32 p-3 m-5 bg-amber-100" type="submit" disabled={isLoading} text="Login">    
            </Button>

        </Form>
    )
}
