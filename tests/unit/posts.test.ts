import { describe, expect, it } from "vitest";
import { getAllPosts, getPostBySlug, getPublicPosts, getPostsByTag } from "../../lib/posts";

describe("content pipeline", () => {
  it("keeps draft posts out of public listings", async () => {
    const allPosts = await getAllPosts();
    const publicPosts = await getPublicPosts();

    expect(allPosts.some((post) => post.slug === "draft-design-notes")).toBe(true);
    expect(publicPosts.some((post) => post.slug === "draft-design-notes")).toBe(false);
  });

  it("builds headings for published articles", async () => {
    const post = await getPostBySlug("ai-assisted-editorial-systems");

    expect(post).not.toBeNull();
    expect(post?.headings.map((heading) => heading.text)).toContain("Start with version-controlled source");
  });

  it("returns posts by slugified tag", async () => {
    const posts = await getPostsByTag("product-systems");

    expect(posts.length).toBeGreaterThan(0);
    expect(posts.every((post) => post.tags.includes("Product Systems"))).toBe(true);
  });
});
