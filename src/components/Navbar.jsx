"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { ShoppingBasketIcon } from "lucide-react";
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const { user, handleLogin, handleLogout, loading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileUserMenuOpen, setMobileUserMenuOpen] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const routes = [
    { name: "Inicio", href: "/" },
    { name: "Tienda", href: "/packages" },
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

  const inBasket = user?.packages.length > 0 || null;

  return (
    <nav className="fixed top-0 w-full text-white shadow-lg">
      <div class="absolute top-0 h-26 w-full bg-linear-to-b from-black to-transparent inset-0"></div>
      <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8 mt-1">
        <div className="flex h-10 items-center justify-between">
          {/* Logo + Nombre */}
          <Link href="/" className="text-xl font-bold z-10">
            Example Shop
          </Link>

          {/* Rutas centradas */}
          <div className="hidden md:flex gap-6 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
            {routes.map((route) => (
              <Link
                key={route.name}
                href={route.href}
                className="text-white/80 hover:text-white font-semibold transition-all duration-200"
              >
                {route.name}
              </Link>
            ))}
          </div>

          {/* Usuario o login */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex gap-3 items-center relative">
                {/* Cesta */}
                <div className="relative">
                  <Link href="/basket">
                    <Button variant="outline" size="icon">
                      <ShoppingBasketIcon size={24} />
                    </Button>
                  </Link>

                  {/* Punto rojo si hay cosas en la cesta */}
                  {inBasket && (
                    <span className="absolute top-[3px] right-[3px] bg-red-500 w-3 h-3 animate-pulse rounded-full border border-black" />
                  )}
                </div>

                <button
                  onClick={() => setMobileUserMenuOpen(!mobileUserMenuOpen)}
                  className="flex items-center gap-3 cursor-pointer bg-white/10 px-3 py-2 rounded-full hover:bg-white/15 border border-white/10 transition"
                >
                  <Avatar>
                    <AvatarImage src={user.avatarUrl} alt={user.username} />
                    <AvatarFallback className="rounded-full bg-blue-500 text-white font-bold">
                      {user.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="pt-1 pr-1 font-semibold">
                    {user.username}
                  </span>
                </button>

                <AnimatePresence>
                  {mobileUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-26 w-40 bg-black border border-white/10 rounded-2xl shadow-lg overflow-hidden z-50"
                    >
                      <button
                        onClick={onLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-neutral-900 cursor-pointer transition"
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
                className="bg-white px-4 py-2 rounded-full font-semibold hover:bg-white/90 cursor-pointer text-black transition-all duration-200"
              >
                {isLoggingIn ? "Cargando..." : "Iniciar sesión"}
              </button>
            )}
          </div>

          {/* Botón hamburguesa para móvil */}
          <div className="md:hidden flex items-center">
            {/* Cesta */}
            <div className="relative mr-2">
              <Link href="/basket" className="flex cursor-pointer bg-white/10 backdrop-blur-md p-3 rounded-full hover:bg-white/15 border border-white/10 transition">
                <ShoppingBasketIcon
                  size={24}
                  className="text-white/80 hover:text-white"
                />
              </Link>

              {/* Punto rojo si hay cosas en la cesta */}
              {inBasket && (
                <span className="absolute top-[3px] right-[3px] bg-red-500 w-3 h-3 animate-pulse rounded-full border border-black" />
              )}
            </div>
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
              className="md:hidden mt-2 overflow-hidden"
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
                  {isLoggingIn ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    "Iniciar sesión"
                  )}
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
