import { cache } from "react";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import readingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { z } from "zod";
import { mdxComponents } from "@/lib/mdx";
import { absoluteUrl, slugify } from "@/lib/utils";

const POSTS_DIRECTORY = path.join(process.cwd(), "content/posts");

const dateField = z
  .string()
  .min(1)
  .refine((value) => !Number.isNaN(Date.parse(value)), "Enter a valid date string.");

const frontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().min(1),
  publishedAt: dateField,
  updatedAt: dateField.optional(),
  tags: z.array(z.string().min(1)).min(1),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  coverImage: z.string().optional()
});

export type PostFrontmatter = z.infer<typeof frontmatterSchema>;

export type PostHeading = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type PostSummary = PostFrontmatter & {
  readingTime: string;
  headings: PostHeading[];
  filePath: string;
  canonicalPath: string;
};

export type PostDocument = PostSummary & {
  content: React.ReactNode;
};

async function readPostSource(filePath: string) {
  const raw = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = frontmatterSchema.parse(data);

  return {
    frontmatter,
    content
  };
}

function extractHeadings(content: string): PostHeading[] {
  const lines = content.split("\n");
  const headings: PostHeading[] = [];

  for (const line of lines) {
    const match = /^(##|###)\s+(.+)$/.exec(line.trim());

    if (!match) {
      continue;
    }

    headings.push({
      id: slugify(match[2]),
      text: match[2],
      level: match[1].length as 2 | 3
    });
  }

  return headings;
}

async function getAllPostFiles() {
  const entries = await fs.readdir(POSTS_DIRECTORY);
  return entries.filter((entry) => entry.endsWith(".mdx"));
}

async function parsePostSummary(fileName: string): Promise<PostSummary> {
  const filePath = path.join(POSTS_DIRECTORY, fileName);
  const { frontmatter, content } = await readPostSource(filePath);

  return {
    ...frontmatter,
    coverImage: frontmatter.coverImage,
    tags: frontmatter.tags.map((tag) => tag.trim()),
    readingTime: readingTime(content).text,
    headings: extractHeadings(content),
    filePath,
    canonicalPath: `/blog/${frontmatter.slug}`
  };
}

export const getAllPosts = cache(async () => {
  const files = await getAllPostFiles();
  const posts = await Promise.all(files.map((fileName) => parsePostSummary(fileName)));

  return posts.sort(
    (left, right) =>
      new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime()
  );
});

export async function getPublicPosts() {
  const posts = await getAllPosts();
  return posts.filter((post) => !post.draft);
}

export async function getFeaturedPosts() {
  const posts = await getPublicPosts();
  return posts.filter((post) => post.featured);
}

export async function getLatestPosts(limit = 4) {
  const posts = await getPublicPosts();
  return posts.slice(0, limit);
}

export async function getAllTags() {
  const posts = await getPublicPosts();
  const counts = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([tag, count]) => ({
      tag,
      count,
      href: `/tags/${slugify(tag)}`
    }))
    .sort((left, right) => left.tag.localeCompare(right.tag));
}

export async function getPostsByTag(tagSlug: string) {
  const posts = await getPublicPosts();
  return posts.filter((post) => post.tags.some((tag) => slugify(tag) === tagSlug));
}

export async function getPostSummaryBySlug(slug: string) {
  const posts = await getPublicPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

export async function getPostBySlug(slug: string): Promise<PostDocument | null> {
  const files = await getAllPostFiles();

  for (const fileName of files) {
    const filePath = path.join(POSTS_DIRECTORY, fileName);
    const { frontmatter, content } = await readPostSource(filePath);

    if (frontmatter.slug !== slug) {
      continue;
    }

    if (frontmatter.draft) {
      return null;
    }

    const compiled = await compileMDX({
      source: content,
      components: mdxComponents,
      options: {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: "append" }]
          ]
        }
      }
    });

    return {
      ...frontmatter,
      tags: frontmatter.tags.map((tag) => tag.trim()),
      readingTime: readingTime(content).text,
      headings: extractHeadings(content),
      filePath,
      canonicalPath: `/blog/${frontmatter.slug}`,
      content: compiled.content
    };
  }

  return null;
}

export async function getRelatedPosts(slug: string, tags: string[], limit = 2) {
  const posts = await getPublicPosts();
  const tagSet = new Set(tags.map((tag) => tag.toLowerCase()));

  return posts
    .filter((post) => post.slug !== slug)
    .map((post) => ({
      post,
      score: post.tags.reduce(
        (total, tag) => (tagSet.has(tag.toLowerCase()) ? total + 1 : total),
        0
      )
    }))
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, limit)
    .map((entry) => entry.post);
}

export async function getRssItems() {
  const posts = await getPublicPosts();

  return posts.map((post) => ({
    ...post,
    url: absoluteUrl(post.canonicalPath)
  }));
}
