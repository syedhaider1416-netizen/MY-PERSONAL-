import { ImageResponse } from "next/og";
import { site, hero } from "@/content";

export const alt = `${site.name} — ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0b1a2e",
          backgroundImage:
            "radial-gradient(circle at 78% 30%, rgba(41,200,176,0.18), transparent 55%)",
        }}
      >
        <svg
          width={44}
          height={44}
          viewBox="0 0 40 40"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginBottom: 32 }}
        >
          <path
            d="M8 12 H18 V20"
            fill="none"
            stroke="#8ca3b5"
            strokeWidth="2"
            strokeLinecap="square"
          />
          <path
            d="M8 28 H18 V20"
            fill="none"
            stroke="#8ca3b5"
            strokeWidth="2"
            strokeLinecap="square"
          />
          <path
            d="M8 20 H32"
            fill="none"
            stroke="#29c8b0"
            strokeWidth="2"
            strokeLinecap="square"
          />
          <rect x="16.5" y="18.5" width="3" height="3" fill="#29c8b0" />
        </svg>
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 2,
            color: "#29c8b0",
            fontFamily: "monospace",
            marginBottom: 28,
          }}
        >
          {hero.eyebrow.toUpperCase()}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 700,
            color: "#eaf2f5",
            lineHeight: 1.1,
            maxWidth: 980,
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: "#8ca3b5",
            marginTop: 24,
            maxWidth: 900,
          }}
        >
          I build the system. I build what fills it.
        </div>
      </div>
    ),
    { ...size }
  );
}
