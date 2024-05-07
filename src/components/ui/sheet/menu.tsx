import { Button } from "@/components/ui/button/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet/sheet"
import {
    LogOut,
    User,
    LogIn,
    ShoppingCart,
    Heart,
  
    Bell,
} from "lucide-react"
import Link from "next/link"
import { auth } from "@/auth.config"
import LogoutButton from "../button/logout-button"

export async function Menu() {

    const session = await auth()

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button >Open</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Bienvenido Gian Marco</SheetTitle>
                    <SheetDescription>
                        Compra tus cursos favoritos y aprende de un profesional
                    </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col">
                    {session?.user ? (
                        <>
                            <Link className="my-2 hover:bg-gray-100 rounded transition-all p-2 flex items-center" href={"/profile"}>
                                <User size={24} />
                                <span className="ml-3 text-xl">Mi Perfil</span>
                            </Link>
                            <Link className="my-2 hover:bg-gray-100 rounded transition-all p-2 flex items-center" href={"/courses"}>
                                <Bell size={24} />
                                <span className="ml-3 text-xl">Mis Cursos</span>
                            </Link>
                            <Link className="my-2 hover:bg-gray-100 rounded transition-all p-2 flex items-center" href={"/orders"}>
                                <ShoppingCart size={24} />
                                <span className="ml-3 text-xl">Mis Ordenes</span>
                            </Link>
                            <Link className="my-2 hover:bg-gray-100 rounded transition-all p-2 flex items-center" href={"/courses-favorites"}>
                                <Heart size={24} />
                                <span className="ml-3 text-xl">Mis Favoritos</span>
                            </Link>

                            <LogoutButton />

                            <Link href={"/admin"} className="my-2 hover:bg-gray-100 rounded transition-all p-2 flex items-center">
                                <LogOut size={24} />
                                <span className="ml-2 text-xl">Admin Dashboard</span>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link className="my-2 hover:bg-gray-100 rounded transition-all p-2 flex items-center" href={"/login"}>
                                <LogIn size={24} />
                                <span className="ml-3 text-xl">Iniciar Session</span>
                            </Link>
                            <Link className="my-2 hover:bg-gray-100 rounded transition-all p-2 flex items-center" href={"/new-account"}>
                                <User size={24} />
                                <span className="ml-3 text-xl">Crear Cuenta</span>
                            </Link>
                        </>
                    )}
                </div>


                {/* <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit">Save changes</Button>
                    </SheetClose>
                </SheetFooter> */}
            </SheetContent>
        </Sheet>
    )
}