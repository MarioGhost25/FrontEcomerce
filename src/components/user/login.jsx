import { useState } from "react";

import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router";
import { useForm } from "../../hooks/useForm";
import { useLoginMutation } from "../../store/apis/userApi";

export const Login = () => {

    const [loginUser, { data, response }] = useLoginMutation();

    const { email, password, onInputChange } = useForm({
        email: '',
        password: '',
    })

    const handleSubmit = (e) => {
        try {

            //todo: i gotta make the logic to login a user 
            
        } catch (error) {
            
        }

    }

    return (
        <div className="flex justify-center items-center w-screen h-screen gap-5">
            <form className='flex flex-col gap-5 ' onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={onInputChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={onInputChange}
                />
                <button type="submit" disabled={isLoading}>Login</button>
                {isLoading && <div>Loading...</div>}
                {hasError && <div>Error: {error?.message}</div>}
                {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
            </form>
        </div>
    )
}
