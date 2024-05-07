"use client"
import { logout } from '@/actions/auth/logout'
import { LogOut } from 'lucide-react'
import React from 'react'

export default function LogoutButton() {
    return (
        <button
            onClick={() => logout()}
            className="my-2 hover:bg-gray-100 rounded transition-all p-2 flex items-center">
            <LogOut size={24} />
            <span className="ml-2 text-xl">Cerrar Sesión</span>
        </button>
    )
}
