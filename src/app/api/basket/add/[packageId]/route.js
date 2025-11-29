import { NextResponse } from "next/server";
import { TEBEX_SECRET, TEBEX_STORE_ID, TEBEX_API } from "@/utils/constants";

export async function POST(req, { params }) {
  try {
    const basketId = req.cookies.get("basketId")?.value;
    if (!basketId) return NextResponse.json({ error: "No basketId" }, { status: 401 });

    const { packageId } = params;

    const response = await fetch(`${TEBEX_API}/baskets/${basketId}/packages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Tebex-Secret": TEBEX_SECRET,
      },
      body: JSON.stringify({
        package_id: packageId,
        quantity: 1,
      }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error adding package" }, { status: 500 });
  }
}
