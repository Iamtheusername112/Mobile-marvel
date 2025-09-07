import { NextResponse } from "next/server";
import phonesData from "@/data/phones.json" assert { type: "json" };

export async function GET() {
  return NextResponse.json(phonesData);
}


