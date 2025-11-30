"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Trash } from "lucide-react";

export default function BasketPage() {
  const { user, addToBasket, removeFromBasket, handleCheckout, loading } = useAuth();
  const router = useRouter();

  // -------------------------
  // Skeleton
  // -------------------------
  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black p-10">
        <div className="max-w-4xl mx-auto animate-pulse">
          <div className="h-8 w-52 bg-zinc-300 dark:bg-zinc-800 rounded mb-6" />
          <div className="h-24 w-full bg-zinc-300 dark:bg-zinc-800 rounded mb-4" />
          <div className="h-24 w-full bg-zinc-300 dark:bg-zinc-800 rounded mb-4" />
        </div>
      </div>
    );
  }

  // -------------------------
  // Empty basket
  // -------------------------
  if (!user || user.packages?.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-zinc-600 dark:text-zinc-300">
          Tu cesta está vacía.
        </p>
      </div>
    );

  // -------------------------
  // Basket page
  // -------------------------
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-26">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-black dark:text-white mb-10">
          Tu Cesta
        </h1>

        <div className="space-y-6">
          {user.packages.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-6 bg-white dark:bg-zinc-900 p-3 rounded-xl shadow border border-zinc-200 dark:border-zinc-800"
            >
              {/* IMG */}
              <div className="relative w-24 h-12">
                <Image
                  src={item.image || "/placeholder.png"}
                  alt={item.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              {/* TEXT */}
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-black dark:text-white">
                  {item.name}
                </h2>
                <span>Quantity: {item.in_basket.quantity}</span>
              </div>

              {/* PRICE */}
              <div className="text-xl font-bold text-black dark:text-white">
                {item.in_basket.price}€
              </div>

              {/* DELETE */}
              <button
                onClick={() => removeFromBasket(item.id)}
                className="p-2 bg-red-600 hover:bg-red-700 text-white cursor-pointer rounded-full font-semibold"
              >
                <Trash size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Total + checkout */}
        <div className="mt-10 p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow">
          <div className="flex justify-between text-2xl font-bold">
            <span>Total</span>
            <span>{user.total_price ?? user.base_price}€</span>
          </div>

          <button
            onClick={handleCheckout}
            className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-lg font-semibold"
          >
            Proceder al pago
          </button>
        </div>
      </div>
    </div>
  );
}
