"use client";

import { usePackages } from "@/context/PackageContext";
import Image from "next/image";

export default function PackageList() {
  const { packages, loading, error } = usePackages();

  if (loading) return <p>Cargando paquetes...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {packages.map((pkg) => (
        <li key={pkg.id}>
          <h3>{pkg.name}</h3>
          <Image src={pkg.image} height={300} width={600} alt="a" />
        </li>
      ))}
    </ul>
  );
}
