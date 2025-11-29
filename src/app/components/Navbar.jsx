"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/app/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/app/components/ui/Avatar";
import LoadingSpinner from "@/app/components/ui/LoadingSpinner";

export default function Navbar() {
  const { user, handleLogin, handleLogout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileUserMenuOpen, setMobileUserMenuOpen] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const routes = [
    { name: "Inicio", href: "/" },
    { name: "Tienda", href: "/shop" },
    { name: "Soporte", href: "/support" },
  ];

  const onLogin = async () => {
    try {
      setIsLoggingIn(true);
      await handleLogin();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const onLogout = async () => {
    try {
      await handleLogout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="w-full bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo + Nombre */}
          <Link href="/" className="flex items-center gap-2 text-2xl font-semibold">
            <Image
              src="/logo.png"
              alt="Logo"
              width={36}
              height={36}
              className="rounded"
            />
            MiTienda
          </Link>

          {/* Rutas centradas */}
          <div className="hidden md:flex gap-6">
            {routes.map((route) => (
              <Link
                key={route.name}
                href={route.href}
                className="hover:text-gray-300 transition"
              >
                {route.name}
              </Link>
            ))}
          </div>

          {/* Usuario o login */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setMobileUserMenuOpen(!mobileUserMenuOpen)}
                  className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-md hover:bg-gray-700 transition"
                >
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.username} />
                    <AvatarFallback className="rounded-full bg-blue-500 text-white font-bold">
                      {user.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span>{user.username}</span>
                </button>

                <AnimatePresence>
                  {mobileUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-md shadow-lg overflow-hidden z-50"
                    >
                      <button
                        onClick={onLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-700 transition"
                      >
                        Cerrar sesión
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                onClick={onLogin}
                disabled={isLoggingIn}
                className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-500 transition"
              >
                {isLoggingIn ? <LoadingSpinner size="sm" /> : "Iniciar sesión"}
              </button>
            )}
          </div>

          {/* Botón hamburguesa para móvil */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-2 bg-gray-800 rounded-md shadow-lg overflow-hidden"
            >
              {routes.map((route) => (
                <Link
                  key={route.name}
                  href={route.href}
                  className="block px-4 py-2 hover:bg-gray-700 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {route.name}
                </Link>
              ))}

              {user ? (
                <button
                  onClick={onLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700 transition"
                >
                  Cerrar sesión
                </button>
              ) : (
                <button
                  onClick={onLogin}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700 transition"
                >
                  {isLoggingIn ? <LoadingSpinner size="sm" /> : "Iniciar sesión"}
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
