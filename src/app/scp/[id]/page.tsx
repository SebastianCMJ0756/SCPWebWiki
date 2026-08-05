export default async function SCPPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="p-8 font-mono text-green-500">
      <h1 className="text-2xl font-bold">EXPEDIENTE SCP: {id}</h1>
      <p>Acceso concedido. Datos clasificados...</p>
    </div>
  );
}