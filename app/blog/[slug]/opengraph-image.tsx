import { ImageResponse } from "next/og";
import { getPostSummaryBySlug } from "@/lib/posts";

export const alt = "AI Blog article";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

type PostOgImageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PostOgImage({ params }: PostOgImageProps) {
  const { slug } = await params;
  const post = await getPostSummaryBySlug(slug);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f4f4ef",
          padding: "72px",
          color: "#0f172a"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: 24,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#5d6976"
          }}
        >
          <div
            style={{
              height: 14,
              width: 14,
              borderRadius: 999,
              background: "#0f7f9d"
            }}
          />
          AI Blog
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ maxWidth: 940, fontSize: 70, fontWeight: 700, lineHeight: 1.02 }}>
            {post?.title ?? "AI Blog"}
          </div>
          <div style={{ maxWidth: 900, fontSize: 28, lineHeight: 1.4, color: "#5d6976" }}>
            {post?.excerpt ?? "Technical essays and working build notes for AI-native product teams."}
          </div>
        </div>
      </div>
    ),
    size
  );
}
