"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
  refreshUser: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/basket");
      const data = await res.json();
      setUser(data || null);
    } catch (err) {
      console.error("Error refreshing user:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const addToBasket = async (packageId) => {
    try {
      const res = await fetch(`/api/basket/add/${packageId}`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Error adding to basket");
      }
      setUser(data.data || null);
    } catch (err) {
      console.error("Error adding to basket:", err);
      throw err;
    }
  }

  const removeFromBasket = async (packageId) => {
    try {
      const res = await fetch(`/api/basket/remove/${packageId}`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Error adding to basket");
      }
      setUser(data.data || null);
    } catch (err) {
      console.error("Error adding to basket:", err);
      throw err;
    }
  }

  const handleCheckout = async () => {
    try {
      const res = await fetch("/api/basket/checkout");
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error during checkout");

      window.location.href = data.checkoutURL; // redirige a Tebex
    } catch (err) {
      console.error(err);
    }
  }

  const handleLogin = async () => {
    try {
      const res = await fetch("/api/auth/login");
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error login");

      window.location.href = data.loginURL; // redirige a Tebex
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout");
      setUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, addToBasket, removeFromBasket, handleCheckout, handleLogin, handleLogout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
