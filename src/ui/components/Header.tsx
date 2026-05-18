import Link from 'next/link';

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-gray-200/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo / Título a la izquierda */}
                    <div className="flex-shrink-0">
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                            <Link href="/">Don Merengo Club de Campo</Link>
                        </h1>
                    </div>

                    {/* Links a la derecha */}
                    <nav className="flex space-x-8 text-sm font-medium">
                        <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                            Inicio
                        </Link>
                        <Link href="/nosotros" className="text-gray-600 hover:text-gray-900 transition-colors">
                            Nosotros
                        </Link>
                        <Link href="/contacto" className="text-gray-600 hover:text-gray-900 transition-colors">
                            Contacto
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}