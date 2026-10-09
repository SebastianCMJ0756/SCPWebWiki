'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SCPIndexPage() {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionData = localStorage.getItem('scp_session');
    if (!sessionData) {
      router.replace('/login');
      return;
    }
    try {
      setSession(JSON.parse(sessionData));
    } catch {
      localStorage.removeItem('scp_session');
      router.replace('/login');
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <main className="p-8 text-green-500 bg-black min-h-screen font-mono flex items-center justify-center">
        <div className="text-center">
          <p className="animate-pulse">[ VERIFICANDO ACCESO... ]</p>
        </div>
      </main>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <main className="p-8 text-green-500 bg-black min-h-screen font-mono">
      <div className="flex justify-between items-center mb-8 border-b border-green-500/30 pb-4">
        <h1 className="text-2xl font-bold">[ ACCESO A BASE DE DATOS SCP ]</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-green-400">
            Usuario: {session.nombre || session.username} | Nivel: {session.accessLevel}
          </span>
          <button
            onClick={() => {
              localStorage.removeItem('scp_session');
              router.push('/login');
            }}
            className="text-xs border border-green-500/50 px-3 py-1 hover:bg-green-500/20 transition-colors"
          >
            [ Cerrar Sesión ]
          </button>
        </div>
      </div>
      <p>Seleccione un archivo de la lista para inspeccionar.</p>
    </main>
  );
}