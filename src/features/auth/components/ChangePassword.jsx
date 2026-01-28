

import Form from "../../../components/form/Form";

import Button from '../../../components/ui/button/Button';
import Input from "../../../components/form/input/InputField";

import { toast } from "sonner";
import { useUpdatePasswordMutation } from "../../../api/endpoints/userApi";
import { useSelector } from "react-redux";
import { useForm } from "../../../hooks/useForm";
import { selectIsAuthenticated } from "../slices/authSlice";
import Label from "../../../components/form/Label";

export const ChangePassword = () => {


    const isAuthenticated = useSelector(selectIsAuthenticated);
    const [changePassword ]= useUpdatePasswordMutation();

    const { newPassword, onInputChange } = useForm({
        newPassword: '',
    })

  const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            if(!isAuthenticated){
                toast.error('Usuario no autenticado❌');
                return;
            }
            else{

                const res = await changePassword(newPassword).unwrap();
                toast.success('Contraseña cambiada con exito✅');
                console.log(res);

            }
            

        } catch (error) {
            toast.error(error?.data?.message || 'Error al iniciar sesión❌')
        }

    }

    return (
        <Form
            className='w-[448px] h-[450px] flex flex-col shadow-xl/20 gap-5 bg-cyan-800 p-5 rounded-2xl'
            onSubmit={handleSubmit}
        >
            <Label className="font-bold text-amber-100 text-3xl p-5"
                title="Change Password"
            >
            </Label>

            <Input
                className="p-3 bg-amber-50 rounded-2xl mx-5 outline-none"
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={newPassword}
                onChange={onInputChange}
            />
          
           
            <Button className="w-32 p-3 m-5 bg-amber-100" type="submit" /*disabled={isLoading}*/ text="Change Password">
            </Button>

        </Form>
    )
}


