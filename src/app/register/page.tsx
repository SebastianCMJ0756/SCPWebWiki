'use client';

import { useState } from 'react';
import Link from 'next/link';

// Logo SCP como componente SVG
function SCPLogo() {
  return (
    <svg viewBox="0 0 200 200" className="w-32 h-32 sm:w-40 sm:h-40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Escudo exterior */}
      <path
        d="M100 10 L180 30 L190 100 L180 170 L100 190 L20 170 L10 100 L20 30 Z"
        stroke="white"
        strokeWidth="4"
        fill="none"
      />
      {/* Círculo interior */}
      <circle cx="100" cy="100" r="60" stroke="white" strokeWidth="4" fill="none" />
      {/* Flecha superior */}
      <path d="M100 50 L100 85 M85 70 L100 85 L115 70" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Flecha inferior izquierda */}
      <path d="M60 130 L85 105 M70 100 L85 105 L80 120" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Flecha inferior derecha */}
      <path d="M140 130 L115 105 M130 100 L115 105 L120 120" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    edad: '',
    email: '',
    username: '',
    password: '',
    profileImage: null as File | null,
    accessLevel: '1'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Validación para campo de edad - solo dígitos
    if (name === 'edad') {
      if (value && !/^\d*$/.test(value)) {
        setErrors(prev => ({ ...prev, edad: 'Solo se permiten números' }));
        return;
      }
    }

    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpiar error cuando el usuario escribe
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, profileImage: file }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombre.trim()) newErrors.nombre = 'Campo requerido';
    if (!formData.apellido.trim()) newErrors.apellido = 'Campo requerido';
    if (!formData.edad.trim()) newErrors.edad = 'Campo requerido';
    if (!formData.email.trim()) {
      newErrors.email = 'Campo requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Formato de correo inválido';
    }
    if (!formData.username.trim()) newErrors.username = 'Campo requerido';
    if (!formData.password.trim()) {
      newErrors.password = 'Campo requerido';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mínimo 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    // Simulación de registro
    setTimeout(() => {
      setLoading(false);
      alert('Registro completado exitosamente');
    }, 1500);
  };

  const accessLevels = [
    { value: '1', label: 'Nivel 1', description: 'Usuarios básicos', disabled: false },
    { value: '2', label: 'Nivel 2', description: 'Usuarios de rango superior', disabled: true },
    { value: '3', label: 'Nivel 3', description: 'Usuarios importantes', disabled: true },
    { value: '4', label: 'Nivel 4', description: 'Acceso total', disabled: true }
  ];

  return (
    <main className="min-h-screen bg-transparent text-white font-mono p-4 sm:p-8 flex flex-col justify-center items-center">
      {/* Contenedor principal tipo terminal */}
      <div className="w-full max-w-6xl border-2 border-white/30 bg-black/80 p-6 sm:p-10 shadow-[0_0_30px_rgba(255,255,255,0.1)] rounded-sm">
        
        {/* Encabezado superior tipo sistema */}
        <div className="border-b border-white/20 pb-4 mb-8 flex justify-between items-center text-xs text-gray-500 tracking-widest uppercase">
          <span>[REGISTRO: SCiPNET]</span>
          <span>ESTADO: ESPERANDO</span>
        </div>

        {/* Título */}
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-4xl font-black tracking-wider text-white uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
            Registro de Personal
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-2 tracking-widest uppercase">
            Campos requeridos para el registro valido en el sistema
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Columna Izquierda: Datos Personales */}
            <div className="space-y-5">
              <h2 className="text-xs text-gray-400 uppercase tracking-widest border-b border-white/10 pb-2">
                &gt; Datos Personales
              </h2>

              {/* Nombre */}
              <div className="space-y-2">
                <label htmlFor="nombre" className="block text-xs text-gray-400 uppercase tracking-widest">
                  &gt; Nombre
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Ingrese su nombre"
                  className="w-full bg-black/50 border border-white/30 focus:border-white/60 focus:shadow-[0_0_10px_rgba(255,255,255,0.2)] text-gray-200 placeholder-gray-600 px-4 py-3 text-sm tracking-wider outline-none transition-all duration-200"
                />
                {errors.nombre && <p className="text-xs text-red-400">{errors.nombre}</p>}
              </div>

              {/* Apellido */}
              <div className="space-y-2">
                <label htmlFor="apellido" className="block text-xs text-gray-400 uppercase tracking-widest">
                  &gt; Apellido
                </label>
                <input
                  id="apellido"
                  name="apellido"
                  type="text"
                  value={formData.apellido}
                  onChange={handleChange}
                  placeholder="Ingrese su apellido"
                  className="w-full bg-black/50 border border-white/30 focus:border-white/60 focus:shadow-[0_0_10px_rgba(255,255,255,0.2)] text-gray-200 placeholder-gray-600 px-4 py-3 text-sm tracking-wider outline-none transition-all duration-200"
                />
                {errors.apellido && <p className="text-xs text-red-400">{errors.apellido}</p>}
              </div>

              {/* Edad */}
              <div className="space-y-2">
                <label htmlFor="edad" className="block text-xs text-gray-400 uppercase tracking-widest">
                  &gt; Edad
                </label>
                <input
                  id="edad"
                  name="edad"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={formData.edad}
                  onChange={handleChange}
                  placeholder="Ingrese su edad"
                  className="w-full bg-black/50 border border-white/30 focus:border-white/60 focus:shadow-[0_0_10px_rgba(255,255,255,0.2)] text-gray-200 placeholder-gray-600 px-4 py-3 text-sm tracking-wider outline-none transition-all duration-200"
                />
                {errors.edad && <p className="text-xs text-red-400">{errors.edad}</p>}
              </div>

              {/* Correo electrónico */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-xs text-gray-400 uppercase tracking-widest">
                  &gt; Correo Electrónico
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="correo@fundacion.scp"
                  className="w-full bg-black/50 border border-white/30 focus:border-white/60 focus:shadow-[0_0_10px_rgba(255,255,255,0.2)] text-gray-200 placeholder-gray-600 px-4 py-3 text-sm tracking-wider outline-none transition-all duration-200"
                />
                {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
              </div>
            </div>

            {/* Centro: Logo SCP */}
            <div className="flex flex-col items-center justify-center py-8 lg:py-0">
              <div className="relative">
                <div className="absolute inset-0 blur-xl bg-white/5 rounded-full"></div>
                <SCPLogo />
              </div>
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500 tracking-widest uppercase">Fundación SCP</p>
                <p className="text-xs text-gray-600 tracking-widest uppercase mt-1">Secure. Contain. Protect.</p>
              </div>
            </div>

            {/* Columna Derecha: Datos para la Web SCP */}
            <div className="space-y-5">
              <h2 className="text-xs text-gray-400 uppercase tracking-widest border-b border-white/10 pb-2">
                &gt; Acceso al Sistema
              </h2>

              {/* Nombre de usuario */}
              <div className="space-y-2">
                <label htmlFor="username" className="block text-xs text-gray-400 uppercase tracking-widest">
                  &gt; Nombre de Usuario
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Asignar usuario"
                  className="w-full bg-black/50 border border-white/30 focus:border-white/60 focus:shadow-[0_0_10px_rgba(255,255,255,0.2)] text-gray-200 placeholder-gray-600 px-4 py-3 text-sm tracking-wider outline-none transition-all duration-200"
                />
                {errors.username && <p className="text-xs text-red-400">{errors.username}</p>}
              </div>

              {/* Contraseña */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-xs text-gray-400 uppercase tracking-widest">
                  &gt; Contraseña
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Asignar contraseña"
                    className="w-full bg-black/50 border border-white/30 focus:border-white/60 focus:shadow-[0_0_10px_rgba(255,255,255,0.2)] text-gray-200 placeholder-gray-600 px-4 py-3 pr-12 text-sm tracking-wider outline-none transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-400">{errors.password}</p>}
              </div>

              {/* Imagen de perfil */}
              <div className="space-y-2">
                <label htmlFor="profileImage" className="block text-xs text-gray-400 uppercase tracking-widest">
                  &gt; Imagen de Perfil
                </label>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 border border-white/30 bg-black/50 flex items-center justify-center overflow-hidden">
                    {formData.profileImage ? (
                      <img
                        src={URL.createObjectURL(formData.profileImage)}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    )}
                  </div>
                  <label className="flex-1 cursor-pointer">
                    <div className="w-full bg-black/50 border border-white/30 hover:border-white/60 text-gray-400 hover:text-white px-4 py-2 text-sm tracking-wider text-center transition-all duration-200">
                      {formData.profileImage ? 'Cambiar imagen' : 'Seleccionar imagen'}
                    </div>
                    <input
                      id="profileImage"
                      name="profileImage"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Nivel de acceso */}
              <div className="space-y-2">
                <label className="block text-xs text-gray-400 uppercase tracking-widest">
                  &gt; Nivel de Acceso
                </label>
                <div className="space-y-2">
                  {accessLevels.map((level) => (
                    <label
                      key={level.value}
                      className={`flex items-center gap-3 p-3 border transition-all duration-200 ${
                        level.disabled
                          ? 'border-white/10 bg-black/30 opacity-50 cursor-not-allowed'
                          : formData.accessLevel === level.value
                          ? 'border-white/60 bg-white/10 cursor-pointer'
                          : 'border-white/20 bg-black/50 hover:border-white/40 cursor-pointer'
                      }`}
                    >
                      <input
                        type="radio"
                        name="accessLevel"
                        value={level.value}
                        checked={formData.accessLevel === level.value}
                        onChange={handleChange}
                        disabled={level.disabled}
                        className="w-4 h-4 accent-white"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-white">{level.label}</span>
                          {level.disabled && (
                            <span className="text-xs text-gray-600 uppercase tracking-wider">[Bloqueado]</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">{level.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Botón de envío */}
          <div className="mt-10 pt-6 border-t border-white/20">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto sm:px-12 bg-white/10 hover:bg-white hover:text-black text-white font-bold py-4 px-8 border border-white/40 transition-all duration-200 tracking-wider text-sm uppercase text-center shadow-[0_0_15px_rgba(255,255,255,0.1)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/10 disabled:hover:text-white"
            >
              {loading ? '[ PROCESANDO... ]' : '[ Iniciar Protocolo de Registro ]'}
            </button>
          </div>
        </form>

        {/* Enlace de login */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            ¿Ya tiene una cuenta?{' '}
            <Link href="/login" className="text-gray-400 hover:text-white underline tracking-widest transition-colors">
              &gt; Iniciar sesión
            </Link>
          </p>
        </div>

        {/* Pie de terminal con efecto de cursor parpadeante */}
        <div className="mt-8 pt-4 border-t border-white/20 flex items-center text-xs text-gray-500">
          <span className="mr-2">&gt; SCiPNET_REGISTER_</span>
          <span className="animate-pulse w-2.5 h-4 bg-white inline-block"></span>
        </div>

      </div>
    </main>
  );
}
