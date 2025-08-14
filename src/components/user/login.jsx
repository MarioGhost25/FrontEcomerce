
import { useForm } from "../../hooks/useForm";
import { useLoginMutation } from "../../store/apis/userApi";
import { toast } from "react-toastify";

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
        <form className='w-[448px] h-[350px] flex flex-col shadow-xl/20 gap-5 bg-cyan-800 p-5 rounded-2xl' 
        onSubmit={handleSubmit}
        >
            <label className="font-bold text-amber-100 text-3xl p-5">Login</label>
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
            <button className="w-32 p-3 m-5 bg-amber-100" type="submit" disabled={isLoading}>Login</button>
            {isLoading && <div>Loading...</div>}

        </form>
    )
}
