import { redirect } from "next/navigation";
import { getToken } from "@/lib/auth";
import FormularioLogin from "@/components/FormularioLogin";

export const metadata = { title: "Ingresar | Vivero Varden" };

export default async function PaginaLogin() {
    if (await getToken()) redirect("/");

    return (
        <div className="py-8">
            <FormularioLogin />
        </div>
    );
}