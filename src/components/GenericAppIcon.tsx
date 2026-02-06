import React from "react";

export default function GenericAppIcon({ size = 48 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className="rounded-xl bg-white/5"
      style={{ background: "rgba(229, 231, 235, 0.10)" }}
    >
    </svg>
  );
}
