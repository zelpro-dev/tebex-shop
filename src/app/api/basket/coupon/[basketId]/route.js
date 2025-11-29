import { NextResponse } from "next/server";
import axios from "axios";
import { TEBEX_SECRET, TEBEX_STORE_ID, TEBEX_API } from "@/utils/constants";

export async function POST(req, { params }) {
  try {
    const { basketId } = params;
    const body = await req.json();
    const { coupon } = body;

    if (!coupon) {
      return NextResponse.json({ error: "Se requiere un cupón" }, { status: 400 });
    }

    const response = await axios.post(
      `${TEBEX_API}/accounts/${TEBEX_STORE_ID}/baskets/${basketId}/coupons`,
      { coupon_code: coupon },
      { headers: { "Content-Type": "application/json", "X-Tebex-Secret": TEBEX_SECRET } }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error);
    return NextResponse.json(
      error.response?.data || { error: "Error aplicando cupón" },
      { status: error.response?.status || 500 }
    );
  }
}
