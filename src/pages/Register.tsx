import { FormEvent, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";

const Register = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const name = nameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if (!email || !password || !name) {
            setError("Por favor, llena todos los campos");
            return;
        }

        const response = await fetch("http://localhost:8000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, name, password_confirmation: password }),
        });

        const data = await response.json();

        if (!data.user) {
            setError("Error al crear la cuenta");
            return;
        }

        localStorage.setItem("token", data.user.id);
        navigate("/");
    }

    return (
        (
            <div className="bg-base-200 min-h-screen flex items-center justify-center">
                <div className="card lg:card-side bg-base-100 shadow-xl max-w-4xl w-full">
                    <figure className="lg:w-1/2">
                        <img
                            src="https://picsum.photos/seed/login/800/600"
                            alt="Random image"
                            className="object-cover w-full h-full"
                        />
                    </figure>
                    <div className="card-body lg:w-1/2">
                        <h2 className="card-title text-2xl font-bold mb-6">Crea tu cuenta</h2>
                        <form onSubmit={onSubmit}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Nombre</span>
                                </label>
                                <label className="input input-bordered flex items-center gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="w-4 h-4 opacity-70"
                                    >
                                        <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                        <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                                    </svg>
                                    <input
                                        ref={nameRef}
                                        type="text"
                                        className="grow"
                                        placeholder="Tu nombre"
                                    />
                                </label>
                            </div>
                            <div className="form-control mt-4">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <label className="input input-bordered flex items-center gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="w-4 h-4 opacity-70"
                                    >
                                        <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                        <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                                    </svg>
                                    <input
                                        ref={emailRef}
                                        type="email"
                                        className="grow"
                                        placeholder="email@example.com"
                                    />
                                </label>
                            </div>
                            <div className="form-control mt-4">
                                <label className="label">
                                    <span className="label-text">Contraseña</span>
                                </label>
                                <label className="input input-bordered flex items-center gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="w-4 h-4 opacity-70"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <input
                                        ref={passwordRef}
                                        type="password"
                                        className="grow"
                                        placeholder="********"
                                    />
                                </label>
                                <div className="my-2">
                                    <span className="text-error">{error}</span>
                                </div>

                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Crear</button>
                            </div>
                        </form>
                        <div className="divider">O si ya tienes cuenta</div>
                        <div className="text-center">
                            <Link to="/login" className="link link-primary">
                                Inicia sesion
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        )
    )
}

export default Register;