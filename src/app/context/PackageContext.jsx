"use client";

import { createContext, useContext, useState, useEffect } from "react";

const PackageContext = createContext({
  packages: [],
  loading: true,
  error: null,
  refreshPackages: () => {},
});

export const PackageProvider = ({ children }) => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPackages = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/packages");
      if (!res.ok) throw new Error("Error al cargar los paquetes");

      const data = await res.json();
      setPackages(data.data || []); // depende del JSON que devuelva tu API
    } catch (err) {
      console.error("Error fetching packages:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Solo se llama una vez al montar
  useEffect(() => {
    fetchPackages();
  }, []);

  return (
    <PackageContext.Provider value={{ packages, loading, error, refreshPackages: fetchPackages }}>
      {children}
    </PackageContext.Provider>
  );
};

export const usePackages = () => useContext(PackageContext);
