import { getRssItems } from "@/lib/posts";
import { siteConfig } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export async function GET() {
  const items = await getRssItems();

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>${siteConfig.name}</title>
    <link>${siteConfig.url}</link>
    <description>${siteConfig.description}</description>
    ${items
      .map(
        (item) => `<item>
      <title>${item.title}</title>
      <link>${item.url}</link>
      <guid>${item.url}</guid>
      <description>${item.excerpt}</description>
      <pubDate>${formatDate(item.publishedAt)}</pubDate>
    </item>`
      )
      .join("\n")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8"
    }
  });
}
