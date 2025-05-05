import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Unit Converter PWA",
    short_name: "Converter",
    description: "A Progressive Web App for converting between different units",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
  }
}
