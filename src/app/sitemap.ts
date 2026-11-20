import type { MetadataRoute } from "next";
import blogs from "@/data/blogs";

const baseUrl = "https://hacktrion.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/participants", "/organizations", "/blogs", "/about", "/meet-the-team", "/contact", "/privacy-policy", "/terms-and-conditions", "/cookie-policy"];
  return [
    ...staticRoutes.map((route) => ({ url: `${baseUrl}${route}`, changeFrequency: "weekly" as const, priority: route === "" ? 1 : 0.7 })),
    ...blogs.map((post) => ({ url: `${baseUrl}/blogs/${post.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
