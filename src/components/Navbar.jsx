import Link from "next/link";

export default function Navbar() {
    return (
        <header className="border-b border-green-200 bg-white">
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
                <Link href="/" className="text-xl font-bold text-green-800">
                    Vivero Varden
                </Link>
                <ul className="flex gap-6 text-sm text-gray-700">
                    <li>
                        <Link href="/">Inicio</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}