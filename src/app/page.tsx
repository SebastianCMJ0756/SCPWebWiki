import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent text-white font-mono p-6 sm:p-12 flex flex-col justify-center items-center">
      {/* Contenedor principal tipo terminal */}
      <div className="w-full max-w-5xl border-2 border-white/30 bg-black/70 p-6 sm:p-10 shadow-[0_0_20px_rgba(255,255,255,0.1)] rounded-sm">
        
        {/* Encabezado superior tipo sistema */}
        <div className="border-b border-white/20 pb-4 mb-8 flex justify-between items-center text-xs text-gray-500 tracking-widest uppercase">
          <span>[SISTEMA_OPERATIVO: SCiPNET v3.08]</span>
          <span>ESTADO: CONECTADO</span>
        </div>

        {/* Layout de 2 columnas para Escritorio / 1 columna para Móvil */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
           
          {/* Columna Izquierda: Título y Descripción (Toma 2 espacios) */}
          <div className="md:col-span-2 space-y-4">
            <h1 className="text-3xl sm:text-5xl font-black tracking-wider text-white uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
              Fundación SCP
            </h1>
             
            <p className="text-xs sm:text-sm text-gray-400 font-semibold tracking-widest uppercase">
              Secure Contain Protect
            </p>

            <div className="pt-2 text-sm text-gray-300 leading-relaxed space-y-3">
              <p>
                Para ver el contenido del universo SCP, es necesario iniciar sesion, en caso de no tener una cuenta, puede registrarse.
              </p>
              <p className="text-xs text-gray-500">
                Al iniciar correctamente, podra ver todo el contenido sobre el universo SCP, incluyendo los documentos de cada SCP, sus historias y mucho más.
              </p>
            </div>
          </div>

          {/* Columna Derecha: Botones de Inicio de Sesión y Registro */}
          <div className="flex flex-col space-y-4 border-t md:border-t-0 md:border-l border-white/20 pt-6 md:pt-0 md:pl-8 justify-center">
            <span className="text-xs text-gray-400 uppercase tracking-widest text-center mb-2">
              Autenticación
            </span>

            {/* Botón Iniciar Sesión */}
            <Link 
              href="/login"
              className="w-full bg-white/10 hover:bg-white hover:text-black text-white font-bold py-3 px-4 border border-white/40 transition-all duration-200 tracking-wider text-sm uppercase text-center shadow-[0_0_10px_rgba(255,255,255,0.1)] block"
            >
              [ Iniciar Sesión ]
            </Link>

            {/* Botón Registrarse */}
            <Link 
              href="/register"
              className="w-full bg-transparent hover:bg-white/10 text-gray-400 hover:text-white font-bold py-3 px-4 border border-white/30 hover:border-white/60 transition-all duration-200 tracking-wider text-sm uppercase text-center block"
            >
              [ Registrarse ]
            </Link>

            {/* Enlace de acceso directo temporal a los SCPs */}
            <div className="pt-4 text-center">
              <Link 
                href="/scp" 
                className="text-xs text-gray-500 hover:text-white underline tracking-widest transition-colors"
              >
                &gt; Acceder sin credenciales (Modo Invitado)
              </Link>
            </div>
          </div>

        </div>

        {/* Pie de terminal con efecto de cursor parpadeante */}
        <div className="mt-10 pt-4 border-t border-white/20 flex items-center text-xs text-gray-500">
          <span className="animate-pulse w-2.5 h-4 bg-white inline-block"></span>
        </div>

      </div>
    </main>
  );
}