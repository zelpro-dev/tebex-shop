import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { username } = params;

  if (!username) {
    return NextResponse.json(
      { error: "Se requiere un nombre de usuario." },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`https://forum.cfx.re/u/${username}.json`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Usuario no encontrado." },
        { status: 404 }
      );
    }

    const data = await response.json();
    const template = data?.user?.avatar_template;

    if (!template) {
      return NextResponse.json(
        { error: "El usuario no tiene avatar disponible." },
        { status: 404 }
      );
    }

    // Sustituir {size}
    const avatarUrl = `https://forum.cfx.re${template.replace("{size}", "96")}`;

    return NextResponse.json({ avatar: avatarUrl });

  } catch (error) {
    return NextResponse.json(
      { error: "Error obteniendo avatar", detail: error.message },
      { status: 500 }
    );
  }
}
