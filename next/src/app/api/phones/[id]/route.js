import { NextResponse } from "next/server";
import phonesData from "@/data/phones.json" assert { type: "json" };

export async function GET(_request, { params }) {
  const id = Number(params.id);
  const phone = phonesData.find((p) => p.id === id);
  if (!phone) {
    return NextResponse.json({ message: "Phone not found" }, { status: 404 });
  }
  return NextResponse.json(phone);
}


