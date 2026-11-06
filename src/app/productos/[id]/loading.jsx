export default function CargandoDetalle() {
    return (
        <div aria-busy="true">
            <div className="mb-6 h-5 w-40 animate-pulse rounded bg-brote" />
            <div className="grid gap-8 md:grid-cols-2">
                <div className="h-80 animate-pulse rounded-xl bg-brote" />
                <div className="space-y-3">
                    <div className="h-4 w-24 animate-pulse rounded bg-brote" />
                    <div className="h-9 w-3/4 animate-pulse rounded bg-brote" />
                    <div className="h-9 w-32 animate-pulse rounded bg-brote" />
                    <div className="h-24 animate-pulse rounded bg-brote" />
                </div>
            </div>
        </div>
    );
}