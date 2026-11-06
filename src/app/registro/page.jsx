import { redirect } from "next/navigation";
import { getToken } from "@/lib/auth";
import FormularioRegistro from "@/components/auth/FormularioRegistro";

export const metadata = { title: "Crear cuenta | Vivero Varden" };

export default async function PaginaRegistro() {
    if (await getToken()) redirect("/");

    return (
        <div className="py-8">
            <FormularioRegistro />
        </div>
    );
}