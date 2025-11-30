"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Trash } from "lucide-react";
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

export default function BasketPage() {
  const { user, addToBasket, removeFromBasket, handleCheckout, loading } =
    useAuth();
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
            <Card className="w-full items-stretch md:flex-row" key={item.id}>
              <div className="relative h-[140px] w-full flex-shrink-0 overflow-hidden rounded-2xl sm:h-[120px] sm:w-[120px]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                />
              </div>
              <div className="flex flex-1 flex-col gap-3">
                <CardHeader className="gap-1">
                  <CardTitle className="pr-8">{item.name}</CardTitle>
                  <CardDescription>
                    Quantity: {item.in_basket.quantity}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto flex w-full flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-col">{item.in_basket.price}€</div>
                  <Button
                    variant="outline" 
                    size="icon"
                    onClick={() => removeFromBasket(item.id)}
                  >
                    <Trash size={16} />
                  </Button>
                </CardFooter>
              </div>
            </Card>
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
