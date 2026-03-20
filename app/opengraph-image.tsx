import { ImageResponse } from "next/og";

export const alt = "AI Blog";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function OpenGraphImage() {
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
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ maxWidth: 930, fontSize: 80, fontWeight: 700, lineHeight: 1.02 }}>
            Technical essays and product systems built in public.
          </div>
          <div style={{ maxWidth: 880, fontSize: 28, lineHeight: 1.4, color: "#5d6976" }}>
            Next.js, MDX, Supabase, Prisma, and a restrained technical interface designed to show real implementation depth.
          </div>
        </div>
      </div>
    ),
    size
  );
}
