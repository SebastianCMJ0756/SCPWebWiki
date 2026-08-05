export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-8 flex flex-col items-center justify-center font-mono">
      <div className="border border-red-600/40 bg-neutral-900/80 p-8 rounded-lg max-w-2xl w-full shadow-2xl shadow-red-950/20">
        <div className="flex items-center justify-between border-b border-red-600/30 pb-4 mb-6">
          <span className="text-red-500 font-bold tracking-widest text-sm">
            [SISTEMA DE SEGURIDAD NIVELES 4/5]
          </span>
          <span className="text-xs text-neutral-500">ESTADO: ACTIVO</span>
        </div>

        <h1 className="text-3xl font-black text-red-500 mb-2 tracking-wider">
          FUNDACIÓN SCP
        </h1>
        <p className="text-sm text-neutral-400 mb-6">
          Asegurar, Contener, Proteger. Base de datos central de anomalías clasificadas.
        </p>

        <div className="bg-neutral-950 p-4 rounded border border-neutral-800 text-xs text-green-400">
          <p className="mb-1">&gt; Inicializando protocolo SCiPNET v4.0.2...</p>
          <p className="mb-1">&gt; Autenticación de terminal completada.</p>
          <p>&gt; Bienvenido, Operador. Selecciona una ficha de contención.</p>
        </div>
      </div>
    </main>
  );
}