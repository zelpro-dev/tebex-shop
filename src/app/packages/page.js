"use client";

import Image from "next/image";
import { usePackages } from "@/context/PackageContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function ProductsPage() {
  const { packages, loading, error } = usePackages();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        <p className="text-lg text-zinc-700 dark:text-zinc-300 animate-pulse">
          Cargando productos...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-26 px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-black dark:text-white mb-10">
          Nuestros Productos
        </h1>

        {packages.length === 0 ? (
          <p className="text-zinc-600 dark:text-zinc-400">
            No hay productos disponibles.
          </p>
        ) : (
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg) => (
              <ProductCard key={pkg.id} product={pkg} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCard({ product }) {
  const { user, addToBasket } = useAuth();

  return (
    <Card>
      {/* IMG */}
      <div className="relative w-full h-48 mb-4">
        <Image
          src={product.image || "/placeholder.png"}
          alt={product.name}
          fill
          className="object-cover rounded-xl"
        />
      </div>
      <div className="px-4 pb-4">
        {/* NAME */}
        <CardTitle className="text-2xl font-semibold text-black dark:text-white">
          {product.name}
        </CardTitle>

        {/* PRICE + BUTTON */}
        <CardFooter className="mt-4 flex items-center justify-between">
          <span className="text-lg font-normal text-black dark:text-white">
            {product.total_price}€
          </span>
          <Button onClick={() => addToBasket(product.id)} >
            Añadir a la cesta
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
