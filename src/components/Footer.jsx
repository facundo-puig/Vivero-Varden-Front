export default function Footer() {
    return (
        <footer className="border-t border-green-200 bg-white">
            <div className="mx-auto max-w-6xl px-4 py-6 text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} Vivero Varden
            </div>
        </footer>
    );
}