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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validar que los campos no estén vacíos
    if (!username.trim() || !password.trim()) {
      setError('ERROR: DEBE INGRESAR LOS DATOS NECESARIOS. SI NO ESTÁ REGISTRADO, DEBE REGISTRARSE PARA PODER INGRESAR.');
      return;
    }

    setLoading(true);

    try {
      const API_URL = 'https://script.google.com/macros/s/AKfycbxcR-oDtgo5GVYJ3ClkSQadNegchqyoDJbMB-hgSJO2ZIk7Bu-eYsIAGBMqtrQNlpkw/exec';

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify({
          action: 'login',
          username: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (data.success === true) {
        // Guardar sesión en localStorage
        localStorage.setItem('scp_session', JSON.stringify({
          username: data.user?.username || username,
          email: data.user?.email || '',
          nombre: data.user?.nombre || '',
          accessLevel: data.user?.accessLevel || '1',
          loginTime: new Date().toISOString()
        }));
        router.push('/scp');
      } else {
        setError(data.error || 'Error de autenticación.');
      }
    } catch {
      setError('Error de conexión con el servidor. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-transparent text-white font-mono p-6 sm:p-12 flex flex-col justify-center items-center">
      {/* Contenedor principal tipo terminal */}
      <div className="w-full max-w-md border-2 border-white/30 bg-black/70 p-6 sm:p-10 shadow-[0_0_20px_rgba(255,255,255,0.1)] rounded-sm">
        
        {/* Encabezado superior tipo sistema */}
        <div className="border-b border-white/20 pb-4 mb-8 flex justify-between items-center text-xs text-gray-500 tracking-widest uppercase">
          <span>[ACCESO: SCiPNET]</span>
          <span>ESTADO: SEGURO</span>
        </div>

        {/* Título */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-black tracking-wider text-white uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
            Iniciar Sesión
          </h1>
          <p className="text-xs text-gray-400 mt-2 tracking-widest uppercase">
            Ingrese sus credenciales de acceso
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo Usuario */}
          <div className="space-y-2">
            <label htmlFor="username" className="block text-xs text-gray-400 uppercase tracking-widest">
              &gt; Usuario
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingrese su usuario"
              autoComplete="username"
              className="w-full bg-black/50 border border-white/30 focus:border-white/60 focus:shadow-[0_0_10px_rgba(255,255,255,0.2)] text-gray-200 placeholder-gray-600 px-4 py-3 text-sm tracking-wider outline-none transition-all duration-200"
            />
          </div>

          {/* Campo Contraseña */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-xs text-gray-400 uppercase tracking-widest">
              &gt; Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su contraseña"
              autoComplete="current-password"
              className="w-full bg-black/50 border border-white/30 focus:border-white/60 focus:shadow-[0_0_10px_rgba(255,255,255,0.2)] text-gray-200 placeholder-gray-600 px-4 py-3 text-sm tracking-wider outline-none transition-all duration-200"
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
            className="w-full bg-white/10 hover:bg-white hover:text-black text-white font-bold py-3 px-4 border border-white/40 transition-all duration-200 tracking-wider text-sm uppercase text-center shadow-[0_0_10px_rgba(255,255,255,0.1)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/10 disabled:hover:text-white"
          >
            {loading ? '[ Verificando credenciales... ]' : '[ Ingresar ]'}
          </button>
        </form>

        {/* Enlaces de navegación */}
        <div className="mt-6 pt-6 border-t border-white/20 text-center space-y-3">
          <p className="text-xs text-gray-400 tracking-widest uppercase">
            ¿No tiene una cuenta?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
            <Link 
              href="/register"
              className="text-xs text-gray-500 hover:text-white underline tracking-widest transition-colors"
            >
              &gt; Registrarse
            </Link>
            <span className="text-gray-700 hidden sm:inline">|</span>
            <Link 
              href="/"
              className="text-xs text-gray-500 hover:text-white underline tracking-widest transition-colors"
            >
              &gt; Volver al inicio
            </Link>
          </div>
        </div>

        {/* Pie de terminal con efecto de cursor parpadeante */}
        <div className="mt-8 pt-4 border-t border-white/20 flex items-center text-xs text-gray-500">
          <span className="animate-pulse w-2.5 h-4 bg-white inline-block"></span>
        </div>

      </div>
    </main>
  );
}
