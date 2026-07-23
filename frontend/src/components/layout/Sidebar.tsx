import { Link } from 'react-router-dom';

const links = [
  { to: '/', label: 'Dashboard' },
  { to: '/biblioteca', label: 'Biblioteca' },
  { to: '/generos', label: 'Géneros' },
];

export function Sidebar() {
  return (
    <aside className="h-screen w-64 flex-shrink-0 border-r border-gray-200 bg-[#1a3a2a] px-6 py-8 text-white shadow-lg">
      <div className="mb-8">
        <h2 className="text-xl font-semibold tracking-wide">Mi Biblioteca</h2>
        <p className="mt-1 text-sm text-green-100">Gestiona tus libros</p>
      </div>

      <nav className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="flex items-center rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-white/10 hover:text-green-100"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}