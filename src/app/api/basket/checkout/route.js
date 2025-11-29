import { NextResponse } from "next/server";
import axios from "axios";
import { TEBEX_SECRET, TEBEX_STORE_ID, TEBEX_API } from "@/app/utils/constants";

export async function GET(req) {
  try {
    const basketId = req.cookies.get("basketId")?.value;
    if (!basketId) return NextResponse.json({ error: "No basketId" }, { status: 401 });

    const response = await axios.get(`${TEBEX_API}/accounts/${TEBEX_STORE_ID}/baskets/${basketId}`, {
      headers: { "X-Tebex-Secret": TEBEX_SECRET },
    });

    const checkoutLink = response.data.data.links?.checkout;
    if (!checkoutLink) {
      return NextResponse.json(
        { error: "No se encontró link de checkout (cesta vacía)" },
        { status: 404 }
      );
    }

    return NextResponse.json({ checkoutLink });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al redirigir al checkout" }, { status: 500 });
  }
}
