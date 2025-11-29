import { NextResponse } from "next/server";
import axios from "axios";
import { TEBEX_STORE_ID, TEBEX_SECRET, TEBEX_API} from "@/app/utils/constants";

export async function GET(req, { params }) {
  try {
    const { productId } = params;

    if (!productId) {
      return NextResponse.json({ error: "Se requiere productId" }, { status: 400 });
    }

    const response = await axios.get(`${TEBEX_API}/accounts/${TEBEX_STORE_ID}/packages/${productId}`, {
      headers: { "X-Tebex-Secret": TEBEX_SECRET },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching package:", error.response?.data || error);
    return NextResponse.json(
      { error: "Error fetching package" },
      { status: error.response?.status || 500 }
    );
  }
}
