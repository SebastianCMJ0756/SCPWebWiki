import Link from 'next/link';

export default function OtrosPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6 font-mono text-white">
      <div className="w-full max-w-xl border border-white/30 bg-black/75 p-8 text-center shadow-[0_0_24px_rgba(255,255,255,0.08)] sm:p-12">
        <p className="text-xs tracking-[0.2em] text-gray-500">[ ARCHIVO COMPLEMENTARIO ]</p>
        <h1 className="mt-6 text-xl font-bold uppercase tracking-wider drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
          [SECCIÓN EN DESARROLLO]
        </h1>
        <Link
          href="/"
          className="mt-8 inline-block border border-white/30 px-5 py-3 text-xs tracking-widest text-gray-300 transition-colors hover:border-white/60 hover:bg-white/10 hover:text-white"
        >
          &lt; VOLVER AL INICIO
        </Link>
      </div>
    </main>
  );
}
