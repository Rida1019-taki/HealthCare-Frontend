import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import {
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
} from "react-icons/fa";

import api from "../../services/api";
import "./Login.css";

const schema = yup.object({
    email: yup
        .string()
        .email("Adresse e-mail invalide")
        .required("L'adresse e-mail est obligatoire"),

    password: yup
        .string()
        .required("Le mot de passe est obligatoire")
        .min(8, "Minimum 8 caractères"),
});

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            console.log("Request:", data);

            const response = await api.post("/auth/login", {
                email: data.email.trim(),
                password: data.password,
            });

            console.log("STATUS =", response.status);
            console.log("DATA =", response.data);

            localStorage.setItem("token", response.data.token);

            console.log("TOKEN SAVED =", localStorage.getItem("token"));

            navigate("/dashboard");

        } catch (error) {
            console.log("STATUS =", error.response?.status);
            console.log("DATA =", error.response?.data);
            console.log(error);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="logo">+</div>

                <h2>Connexion</h2>
                <p className="subtitle">
                    Connectez-vous à votre compte
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>Adresse e-mail</label>

                    <div className="input-box">
                        <FaEnvelope />
                        <input
                            type="email"
                            placeholder="exemple@email.com"
                            {...register("email")}
                        />
                    </div>
                    <small>{errors.email?.message}</small>

                    <label>Mot de passe</label>

                    <div className="input-box">
                        <FaLock />

                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="********"
                            {...register("password")}
                        />

                        <button
                            type="button"
                            className="eye-btn"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <small>{errors.password?.message}</small>

                    <div className="options">
                        <label className="remember">
                            <input type="checkbox" />
                            Se souvenir de moi
                        </label>

                        <Link to="/forgot-password" className="forgot">
                            Mot de passe oublié ?
                        </Link>
                    </div>

                    <button type="submit" className="login-btn">
                        Se connecter
                    </button>
                </form>

                <p className="register-link">
                    Vous n'avez pas de compte ?
                    <Link to="/register"> S'inscrire</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;