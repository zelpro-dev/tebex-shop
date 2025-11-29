import { NextResponse } from "next/server";
import axios from "axios";
import { TEBEX_STORE_ID, TEBEX_SECRET, TEBEX_API } from "@/app/utils/constants";

export async function GET(req) {
  try {
    const response = await axios.get(`${TEBEX_API}/accounts/${TEBEX_STORE_ID}/packages`, {
      headers: { "X-Tebex-Secret": TEBEX_SECRET },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching packages:", error.response?.data || error);
    return NextResponse.json(
      { error: "Error fetching packages" },
      { status: error.response?.status || 500 }
    );
  }
}
