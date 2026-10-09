'use client';

import { useEffect, useState } from 'react';
import { UserRound } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Session = {
  username?: string;
  nombre?: string;
  accessLevel?: string;
};

const navigation = [
  { label: 'Fundación SCP', href: '/' },
  { label: 'Insurgencia del Caos', href: '/insurgencia' },
  { label: 'Otros', href: '/otros' },
];

const statistics = [
  { label: 'SCPs Capturados', value: '3,247' },
  { label: 'Instalaciones Mundiales', value: '214' },
  { label: 'Personal Activo', value: '52,341' },
  { label: 'Clases de Objeto', value: '6' },
];

const scps = [
  { number: 'SCP-173', objectClass: 'Euclid' },
  { number: 'SCP-096', objectClass: 'Euclid' },
  { number: 'SCP-682', objectClass: 'Keter' },
  { number: 'SCP-049', objectClass: 'Euclid' },
  { number: 'SCP-106', objectClass: 'Keter' },
  { number: 'SCP-008', objectClass: 'Euclid' },
];

function SCPLogo() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="h-10 w-10 shrink-0"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 10 L180 30 L190 100 L180 170 L100 190 L20 170 L10 100 L20 30 Z"
        stroke="currentColor"
        strokeWidth="7"
      />
      <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="7" />
      <path
        d="M100 50 L100 85 M85 70 L100 85 L115 70 M60 130 L85 105 M70 100 L85 105 L80 120 M140 130 L115 105 M130 100 L115 105 L120 120"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SCPIndexPage() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionData = localStorage.getItem('scp_session');
    if (!sessionData) {
      router.replace('/login');
      return;
    }

    try {
      setSession(JSON.parse(sessionData) as Session);
    } catch {
      localStorage.removeItem('scp_session');
      router.replace('/login');
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center p-6 font-mono text-white">
        <div className="border border-white/30 bg-black/75 px-8 py-6 text-center shadow-[0_0_20px_rgba(255,255,255,0.08)]">
          <p className="animate-pulse text-xs tracking-widest text-gray-300">[ VERIFICANDO ACCESO... ]</p>
        </div>
      </main>
    );
  }

  if (!session) {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('scp_session');
    router.push('/login');
  };

  return (
    <main className="min-h-screen px-4 py-6 font-mono text-white sm:px-8 sm:py-10">
      <div className="mx-auto w-full max-w-7xl rounded-sm border border-white/30 bg-black/75 p-5 shadow-[0_0_24px_rgba(255,255,255,0.08)] sm:p-8">
        <header className="flex flex-col gap-5 border-b border-white/20 pb-5 lg:flex-row lg:items-center lg:justify-between">
          <Link href="/" className="flex items-center gap-3 text-white transition-colors hover:text-gray-300">
            <SCPLogo />
            <span className="text-sm font-bold tracking-[0.18em] sm:text-base">FUNDACIÓN SCP</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <nav aria-label="Navegación principal" className="flex flex-wrap gap-2">
              {navigation.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="border border-white/20 px-3 py-2 text-[10px] tracking-wider text-gray-400 transition-all hover:border-white/50 hover:bg-white/5 hover:text-white sm:px-4 sm:text-xs"
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div
              aria-label={`Sesión de ${session.nombre || session.username || 'usuario'}`}
              title={session.nombre || session.username || 'Usuario'}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/50 bg-white/5 text-gray-300"
            >
              <UserRound size={19} strokeWidth={1.5} aria-hidden="true" />
            </div>
          </div>
        </header>

        <section className="flex flex-col gap-4 border-b border-white/20 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] tracking-[0.2em] text-gray-500">[ ACCESO A BASE DE DATOS SCP ]</p>
            <h1 className="mt-2 text-xl font-bold uppercase tracking-wider drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] sm:text-2xl">
              Archivo de contención
            </h1>
            <p className="mt-2 text-xs text-gray-400">
              Usuario: {session.nombre || session.username} <span className="px-2 text-gray-600">|</span> Nivel:{' '}
              {session.accessLevel || '1'}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="self-start border border-white/30 px-4 py-2 text-xs tracking-widest text-gray-300 transition-colors hover:border-white/60 hover:bg-white/10 hover:text-white sm:self-auto"
          >
            [ CERRAR SESIÓN ]
          </button>
        </section>

        <section className="grid grid-cols-1 gap-8 py-8 md:grid-cols-2 md:items-center">
          <div className="space-y-5">
            <p className="text-xs tracking-[0.2em] text-gray-500">[ SISTEMA_OPERATIVO: SCiPNET ]</p>
            <div>
              <h2 className="text-2xl font-black uppercase tracking-wider drop-shadow-[0_0_8px_rgba(255,255,255,0.25)] sm:text-4xl">
                Secure. Contain. Protect.
              </h2>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-gray-400 sm:text-sm">
                Archivo de anomalías
              </p>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-gray-300">
              La Fundación localiza, contiene y estudia anomalías para proteger a la humanidad y preservar la
              normalidad. Explora los expedientes destacados de la base de datos.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {statistics.map(({ label, value }) => (
              <div
                key={label}
                className="flex min-h-28 flex-col justify-center border border-white/20 bg-black/60 p-4 transition-colors hover:border-white/40 sm:min-h-32 sm:p-5"
              >
                <span className="text-2xl font-bold tracking-wider text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.18)] sm:text-3xl">
                  {value}
                </span>
                <span className="mt-2 text-[10px] uppercase leading-4 tracking-widest text-gray-500 sm:text-xs">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="notable-scps-title" className="border-t border-white/20 pt-6">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="mb-1 text-[10px] tracking-[0.2em] text-gray-500">[ ARCHIVO DESTACADO ]</p>
              <h2 id="notable-scps-title" className="text-lg font-bold uppercase tracking-wider sm:text-xl">
                SCPs Notables
              </h2>
            </div>
            <span className="hidden text-[10px] tracking-widest text-gray-600 sm:block">
              DESLICE PARA EXPLORAR &gt;
            </span>
          </div>

          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
            {scps.map(({ number, objectClass }) => (
              <article
                key={number}
                className="group w-56 shrink-0 snap-start border border-white/20 bg-black/60 p-3 transition-all duration-200 hover:border-white/60 hover:shadow-[0_0_16px_rgba(255,255,255,0.1)] sm:w-60"
              >
                <div className="flex h-32 items-center justify-center border border-white/10 bg-white/[0.03] text-xs tracking-widest text-gray-600 transition-colors group-hover:border-white/25 group-hover:text-gray-400">
                  Imagen {number}
                </div>
                <div className="pt-4">
                  <h3 className="text-lg font-bold tracking-wider text-white">{number}</h3>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-gray-500">
                    Clase de objeto: <span className="text-gray-300">{objectClass}</span>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
