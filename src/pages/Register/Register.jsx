import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
} from "react-icons/fa";

import "./Register.css";

const schema = yup.object({
    fullname: yup
        .string()
        .required("Le nom est obligatoire")
        .min(3, "Minimum 3 caractères"),

    email: yup
        .string()
        .email("Adresse e-mail invalide")
        .required("L'adresse e-mail est obligatoire"),

    password: yup
        .string()
        .required("Le mot de passe est obligatoire")
        .min(8, "Le mot de passe doit contenir au moins 8 caractères"),

    confirmPassword: yup
        .string()
        .oneOf(
            [yup.ref("password")],
            "Les mots de passe ne correspondent pas"
        )
        .required("Veuillez confirmer votre mot de passe"),

    terms: yup
        .boolean()
        .oneOf([true], "Veuillez accepter les conditions"),
});

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className="register-page">
            <div className="register-card">
                <div className="logo">+</div>

                <h2>Créer un compte</h2>

                <p className="subtitle">
                    Rejoignez notre boutique dès aujourd'hui.
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>Nom complet</label>

                    <div className="input-box">
                        <FaUser />
                        <input
                            type="text"
                            placeholder="Jean Dupont"
                            {...register("fullname")}
                        />
                    </div>
                    <small>{errors.fullname?.message}</small>

                    <label>Adresse e-mail</label>

                    <div className="input-box">
                        <FaEnvelope />
                        <input
                            type="email"
                            placeholder="jean@email.com"
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

                    <label>Confirmer le mot de passe</label>

                    <div className="input-box">
                        <FaLock />

                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="********"
                            {...register("confirmPassword")}
                        />

                        <button
                            type="button"
                            className="eye-btn"
                            onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                            }
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <small>{errors.confirmPassword?.message}</small>

                    <div className="checkbox">
                        <input type="checkbox" {...register("terms")} />

                        <span>
              J'accepte les conditions d'utilisation et la politique de
              confidentialité.
            </span>
                    </div>

                    <small>{errors.terms?.message}</small>

                    <button type="submit" className="register-btn">
                        S'inscrire
                    </button>
                </form>

                <div className="separator">
                    <span>OU</span>
                </div>

                <div className="social-buttons">
                    <button type="button" className="social-btn">
                        Continuer avec Google
                    </button>

                    <button type="button" className="social-btn">
                        Continuer avec Facebook
                    </button>
                </div>

                <p className="login-link">
                    Vous avez déjà un compte ?
                    <Link to="/login"> Se connecter</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;