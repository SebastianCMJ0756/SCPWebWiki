import './globals.css';
import DarkVeil from '../components/DarkVeil';

export const metadata = {
  title: 'SCP Foundation Archive',
  description: 'SCP Web Wiki - Base de Datos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-transparent text-green-500 font-mono relative min-h-screen overflow-x-hidden">
        {/* Fondo animado DarkVeil detrás de toda la app */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <DarkVeil
            hueShift={0}
            noiseIntensity={0.1}
            scanlineIntensity={0.2}
            speed={0.4}
            scanlineFrequency={0.15}
            warpAmount={0.3}
          />
        </div>

        {/* Contenido principal de la web */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}