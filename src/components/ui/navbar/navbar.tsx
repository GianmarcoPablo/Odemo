import { Menu } from "../sheet/menu"
import Link from "next/link"

export default function Navbar() {
    return (
        <div className=" py-4 bg-slate-900">
            <nav className="flex justify-between container mx-auto text-white items-center">
                <Link href="/">Home</Link>

                <div className="flex gap-6">
                    <Link href={"/cursos"}>Cursos</Link>
                    <Link href={"/planes"}>Planes</Link>
                    <Link href={"/contacto"}>Contacto</Link>
                </div>

                <div>
                    <Menu />
                </div>
            </nav>
        </div>
    )
}
