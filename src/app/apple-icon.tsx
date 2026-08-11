import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Apple touch icons must be PNG by platform spec, so this renders the same
// vector paths as icon.svg through ImageResponse rather than shipping a
// pre-rasterized bitmap.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <svg
        width={180}
        height={180}
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="40" height="40" fill="#10243d" />
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
    ),
    { ...size }
  );
}
