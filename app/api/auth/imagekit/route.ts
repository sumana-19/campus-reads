import ImageKit from "imagekit";
import config from "@/lib/config";
import { NextResponse } from "next/server";

const {
  env: {
    imagekit: { publicKey, urlEndpoint, privateKey },
  },
} = config;

const imagekit = new ImageKit({
  publicKey,
  urlEndpoint,
  privateKey,
});

export async function GET() {
  return NextResponse.json(imagekit.getAuthenticationParameters());
}
