export function Navbar() {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">Bienvenido</h3>
        <p className="text-sm text-gray-500">A tus libros</p>
      </div>

      <button className="rounded-md bg-[#1a3a2a] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#264d38]">
        Cerrar sesión
      </button>
    </header>
  );
}