'use client';

import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import PackageList from "../components/PackageList";
import Link from "next/link";

export default function Home() {
  const { user, avatar, loading, handleLogin, handleLogout } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <p className="text-lg text-zinc-700 dark:text-zinc-200">Cargando...</p>
      </div>
    );
  }

  // Usuario logueado
  return (
    <div className="flex flex-col bg-black">
      <main className="flex flex-col flex-1 px-6 md:px-16">
        {/* Hero */}
        <section className="flex flex-col text-center justify-center items-center min-h-screen mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black dark:text-white">
            Scripts de FiveM a tu alcance
          </h1>
          <p className="text-zinc-600 dark:text-zinc-300 text-lg md:text-xl">
            Explora nuestros paquetes y mejora tu servidor de manera rápida y segura.
          </p>
        </section>

        {/* Lista de paquetes */}
        <section className="mb-16">
          <PackageList />
        </section>

        {/* Sección de ventajas */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 text-center">
          <div className="p-6 bg-white dark:bg-zinc-800 rounded shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2 text-black dark:text-white">Scripts de calidad</h3>
            <p className="text-zinc-600 dark:text-zinc-300">Todos nuestros scripts están probados y optimizados.</p>
          </div>
          <div className="p-6 bg-white dark:bg-zinc-800 rounded shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2 text-black dark:text-white">Pago seguro</h3>
            <p className="text-zinc-600 dark:text-zinc-300">Integramos Tebex para pagos confiables y rápidos.</p>
          </div>
          <div className="p-6 bg-white dark:bg-zinc-800 rounded shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2 text-black dark:text-white">Soporte activo</h3>
            <p className="text-zinc-600 dark:text-zinc-300">Nuestro equipo te acompaña en cualquier problema.</p>
          </div>
        </section>
      </main>

      <footer className="w-full py-6 bg-white dark:bg-zinc-900 text-center text-zinc-600 dark:text-zinc-400">
        © {new Date().getFullYear()} JGS Store. Todos los derechos reservados.
      </footer>
    </div>
  );
}
