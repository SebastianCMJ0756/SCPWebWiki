'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulación de autenticación
    setTimeout(() => {
      if (username.trim() && password.trim()) {
        // Aquí iría la lógica real de autenticación
        router.push('/scp');
      } else {
        setError('ERROR: CREDENCIALES INVÁLIDAS. VERIFIQUE SUS DATOS.');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <main className="min-h-screen bg-transparent text-green-500 font-mono p-6 sm:p-12 flex flex-col justify-center items-center">
      {/* Contenedor principal tipo terminal */}
      <div className="w-full max-w-md border-2 border-green-500 bg-black/70 p-6 sm:p-10 shadow-[0_0_20px_rgba(34,197,94,0.2)] rounded-sm">
        
        {/* Encabezado superior tipo sistema */}
        <div className="border-b border-green-500/40 pb-4 mb-8 flex justify-between items-center text-xs text-green-700 tracking-widest uppercase">
          <span>[ACCESO: SCiPNET]</span>
          <span>ESTADO: SEGURO</span>
        </div>

        {/* Título */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-black tracking-wider text-green-400 uppercase drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]">
            Iniciar Sesión
          </h1>
          <p className="text-xs text-green-600 mt-2 tracking-widest uppercase">
            Ingrese sus credenciales de acceso
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo Usuario */}
          <div className="space-y-2">
            <label htmlFor="username" className="block text-xs text-green-600 uppercase tracking-widest">
              &gt; Usuario
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingrese su usuario"
              autoComplete="username"
              className="w-full bg-black/50 border border-green-500/50 focus:border-green-400 focus:shadow-[0_0_10px_rgba(34,197,94,0.3)] text-green-300 placeholder-green-800 px-4 py-3 text-sm tracking-wider outline-none transition-all duration-200"
            />
          </div>

          {/* Campo Contraseña */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-xs text-green-600 uppercase tracking-widest">
              &gt; Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su contraseña"
              autoComplete="current-password"
              className="w-full bg-black/50 border border-green-500/50 focus:border-green-400 focus:shadow-[0_0_10px_rgba(34,197,94,0.3)] text-green-300 placeholder-green-800 px-4 py-3 text-sm tracking-wider outline-none transition-all duration-200"
            />
          </div>

          {/* Mensaje de error */}
          {error && (
            <div className="border border-red-500/50 bg-red-900/20 px-4 py-3 text-xs text-red-400 tracking-wider">
              {error}
            </div>
          )}

          {/* Botón de enviar */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-900/30 hover:bg-green-500 hover:text-black text-green-400 font-bold py-3 px-4 border border-green-500 transition-all duration-200 tracking-wider text-sm uppercase text-center shadow-[0_0_10px_rgba(34,197,94,0.1)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-900/30 disabled:hover:text-green-400"
          >
            {loading ? '[ VERIFICANDO... ]' : '[ Ingresar ]'}
          </button>
        </form>

        {/* Enlace de registro */}
        <div className="mt-6 pt-6 border-t border-green-500/30 text-center">
          <p className="text-xs text-green-600 mb-3 tracking-widest uppercase">
            ¿No tiene una cuenta?
          </p>
          <Link 
            href="/"
            className="text-xs text-green-500 hover:text-green-300 underline tracking-widest transition-colors"
          >
            &gt; Volver al inicio
          </Link>
        </div>

        {/* Pie de terminal con efecto de cursor parpadeante */}
        <div className="mt-8 pt-4 border-t border-green-500/30 flex items-center text-xs text-green-600">
          <span className="mr-2">&gt; SCiPNET_AUTH_</span>
          <span className="animate-pulse w-2.5 h-4 bg-green-500 inline-block"></span>
        </div>

      </div>
    </main>
  );
}
