import { NextResponse } from "next/server";
import axios from "axios";
import { WEB_URL, TEBEX_SECRET, TEBEX_STORE_ID, TEBEX_API } from "@/utils/constants";

// GET /api/basket → obtener basket
export async function GET(req) {
  try {
    const basketId = req.cookies.get("basketId")?.value;
    if (!basketId) {
      return NextResponse.json({ error: "No basketId cookie" }, { status: 401 });
    }

    const response = await axios.get(`${TEBEX_API}/accounts/${TEBEX_STORE_ID}/baskets/${basketId}`, {
      headers: { "X-Tebex-Secret": TEBEX_SECRET },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching basket" }, { status: 500 });
  }
}
