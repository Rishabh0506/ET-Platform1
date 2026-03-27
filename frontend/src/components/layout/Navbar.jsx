export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-200 bg-white px-8 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <span className="text-xl font-bold tracking-tight text-gray-900">
          ET AI
        </span>

        {/* Nav Links */}
        <ul className="flex items-center gap-8 text-sm font-medium text-gray-700">
          <li>
            <a href="/" className="hover:text-gray-900 transition-colors">
              Home
            </a>
          </li>
          <li>
            <a href="/my-et" className="hover:text-gray-900 transition-colors">
              Your Newsroom
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
