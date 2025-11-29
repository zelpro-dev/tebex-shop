"use client";

import Image from "next/image";
import { useAuth } from "@/app/context/AuthContext";

export default function Home() {
  const { user, loading, login, logout } = useAuth();

  // Mientras cargamos la sesión
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <p className="text-lg text-zinc-700 dark:text-zinc-200">Cargando...</p>
      </div>
    );
  }

  // Usuario no logueado → mostrar botón de login
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={100}
            height={20}
            priority
          />

          <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
            <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
              Bienvenido a tu panel
            </h1>
            <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Para continuar, inicia sesión con tu cuenta de Tebex.
            </p>
          </div>

          <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
            <button
              onClick={login}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            >
              Iniciar sesión con Tebex
            </button>
          </div>
        </main>
      </div>
    );
  }

  // Usuario logueado → mostrar info y avatar
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        {user.avatar && (
          <Image
            src={user.avatar}
            alt={`${user.username} avatar`}
            width={96}
            height={96}
            className="rounded-full mb-4"
          />
        )}
        <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">
          Hola, {user.username} 👋
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Has iniciado sesión correctamente.
        </p>
        <button
          onClick={logout}
          className="mt-6 flex h-12 items-center justify-center gap-2 rounded-full bg-red-500 px-5 text-white transition-colors hover:bg-red-600 md:w-[158px]"
        >
          Cerrar sesión
        </button>
      </main>
    </div>
  );
}
