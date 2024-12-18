import { FormEvent, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaLock, FaUserAlt } from "react-icons/fa"; // Iconos para inputs
import "../css/Login.css"; // Reutilizamos los estilos del primer ejemplo

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if (!email || !password) {
            setError("Por favor, llena todos los campos");
            return;
        }

        const response = await fetch("http://localhost:8000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!data.user) {
            setError("Credenciales incorrectas");
            return;
        }

        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
    };

    return (
        <div className="login-container">
            <div className="login-overlay"></div>
            <div className="login-content">
                <h1 className="login-title">Inicia sesión</h1>
                <form onSubmit={onSubmit} className="login-form">
                    <div className="input-group">
                        <FaUserAlt className="input-icon" />
                        <input
                            ref={emailRef}
                            type="email"
                            className="input-field"
                            placeholder="Correo Electrónico"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <FaLock className="input-icon" />
                        <input
                            ref={passwordRef}
                            type="password"
                            className="input-field"
                            placeholder="Contraseña"
                            required
                        />
                    </div>
                    {error && <p className="error-message te">{error}</p>}
                    <button type="submit" className="btn btn-login">
                        Iniciar sesión
                    </button>
                </form>
                <div className="login-footer">
                    <p>¿No tienes cuenta?</p>
                    <Link to="/register" className="register-link">
                        Crea una aquí
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
