import type { MetadataRoute } from "next";
import { getAllTags, getPublicPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, tags] = await Promise.all([getPublicPosts(), getAllTags()]);

  return [
    "",
    "/blog",
    "/about",
    "/contact"
  ]
    .map((path) => ({
      url: `${siteConfig.url}${path || "/"}`
    }))
    .concat(
      posts.map((post) => ({
        url: `${siteConfig.url}${post.canonicalPath}`,
        lastModified: post.updatedAt ?? post.publishedAt
      })),
      tags.map((tag) => ({
        url: `${siteConfig.url}${tag.href}`
      }))
    );
}
