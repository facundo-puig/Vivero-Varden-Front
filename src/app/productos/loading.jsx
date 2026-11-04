export default function CargandoCatalogo() {
    return (
        <div aria-busy="true">
            <div className="h-9 w-64 animate-pulse rounded bg-brote" />
            <div className="mt-6 grid gap-8 lg:grid-cols-[16rem_1fr]">
                <div className="h-96 animate-pulse rounded-xl bg-brote" />
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {Array.from({ length: 6 }, (_, i) => (
                        <div key={i} className="h-80 animate-pulse rounded-xl bg-brote" />
                    ))}
                </div>
            </div>
        </div>
    );
}