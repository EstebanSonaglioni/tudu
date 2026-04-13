import React, { useEffect, useState } from "react";
import { ENDPOINTS, STORAGE_KEYS } from "../config/constants";
import { useNavigate } from "react-router-dom";

const RegisterUser = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeated, setPasswordRepeated] = useState("");
    const [passDiff, setPassDiff] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        setPassDiff(password != passwordRepeated);
    }, [password, passwordRepeated]);

    useEffect(()=>{
        if (success){
            setTimeout(()=>{
                navigate("/login")
            },
        3000)
        }
    },[success])

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (error || passDiff) {
            setIsLoading(false);
            return;
        }
        const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
        const resp = await fetch(ENDPOINTS.REGISTER, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });
        setSuccess(resp.ok);
        if (!resp.ok){
            setError("Error al registrar el usuario.")
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 px-4">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-2xl">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-white tracking-tight">
                        Registrate
                    </h2>
                    <p className="text-purple-200 mt-2">
                        Ingresa tus datos para poder generar tu usuario
                    </p>
                </div>

                <form onSubmit={handleRegister} className="space-y-6">
                    <div className="relative">
                        <label className="text-sm font-medium text-purple-100 mb-1 block">
                            Usuario
                        </label>
                        <input
                            type="text"
                            placeholder="Ej: juan_perez"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="relative">
                        <label className="text-sm font-medium text-purple-100 mb-1 block">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="relative">
                        <label className="text-sm font-medium text-purple-100 mb-1 block">
                            Repite la contraseña
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            value={passwordRepeated}
                            onChange={(e) =>
                                setPasswordRepeated(e.target.value)
                            }
                            required
                        />
                    </div>

                    {error && (
                        <div className="bg-red-500/20 border border-red-500/50 text-red-200 text-sm p-3 rounded-lg animate-pulse">
                            {error}
                        </div>
                    )}

                    {passDiff && (
                        <div className="bg-red-500/20 border border-red-500/50 text-red-200 text-sm p-3 rounded-lg animate-pulse">
                            Las contraseñas no coinciden
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-500/20 border border-green-500/50 text-red-200 text-sm p-3 rounded-lg animate-pulse">
                            ¡Usuario registrado!
                        </div>
                    )}
                    <button
                        type="submit"
                        disabled={isLoading || error || passDiff}
                        className="w-full py-3 px-4 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg transform transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center">
                                <svg
                                    className="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full"
                                    viewBox="0 0 24 24"
                                ></svg>
                                Cargando...
                            </span>
                        ) : (
                            "Registrar usuario"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterUser;
