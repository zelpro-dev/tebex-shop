import { WEB_URL, TEBEX_SECRET, TEBEX_STORE_ID } from "@/app/utils/constants";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Crear cesta
    const response = await axios.post(
      `https://headless.tebex.io/api/accounts/${TEBEX_STORE_ID}/baskets`,
      {
        complete_url: `${WEB_URL}`,
        cancel_url: `${WEB_URL}`,
        complete_auto_redirect: true,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Tebex-Secret": TEBEX_SECRET,
        },
      }
    );

    const ident = response.data?.data?.ident;
    if (!ident) throw new Error("No se pudo obtener la cesta (ident)");

    // Petición de login redirect
    const authReq = await axios.get(
      `https://headless.tebex.io/api/accounts/${TEBEX_STORE_ID}/baskets/${ident}/auth?returnUrl=${WEB_URL}`
    );

    const loginURL =
      Array.isArray(authReq.data) ? authReq.data[0].url : authReq.data.url;

    if (!loginURL) throw new Error("Tebex no devolvió URL de login");

    // Crear respuesta con cookie
    const res = NextResponse.json({
      loginURL,
      basketId: ident,
    });

    res.cookies.set("basketId", ident, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "lax" : "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return res;

  } catch (error) {
    console.error("Error al crear la cesta:", error);
    return NextResponse.json(
      { message: "Error al crear la cesta", error: error.message },
      { status: 500 }
    );
  }
}
