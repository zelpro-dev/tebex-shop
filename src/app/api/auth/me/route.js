import { TEBEX_SECRET, TEBEX_STORE_ID } from "@/app/utils/constants";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const basketId = req.cookies.get("basketId")?.value;
    if (!basketId) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const response = await axios.get(
      `https://headless.tebex.io/api/accounts/${TEBEX_STORE_ID}/baskets/${basketId}`,
      {
        headers: {
          "X-Tebex-Secret": TEBEX_SECRET,
        },
      }
    );

    const user = response.data.data;

    if (!user) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    let avatarUrl = null;
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
      authenticated: true,
      user: {
        ...user,
        avatar: avatarUrl,
      },
    });

  } catch (error) {
    console.error("Error en /api/auth/me:", error.message);
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
