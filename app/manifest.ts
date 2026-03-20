import type { MetadataRoute } from "next";
import { defaultManifest } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return defaultManifest;
}
