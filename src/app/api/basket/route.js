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

    // Obtener avatar desde foro.cfx.re
    let avatarUrl = null;
    const user = response.data.data;
    try {
      const forumRes = await fetch(`https://forum.cfx.re/u/${user.username}.json`, {
        cache: "no-store",
      });

      if (forumRes.ok) {
        const forumData = await forumRes.json();
        const template = forumData?.user?.avatar_template;
        if (template) {
          avatarUrl = `https://forum.cfx.re${template.replace("{size}", "96")}`;
        }
      }
    } catch (err) {
      console.warn("No se pudo obtener avatar:", err.message);
    }

    return NextResponse.json({
      ...user,
      avatarUrl,
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching basket" }, { status: 500 });
  }
}
