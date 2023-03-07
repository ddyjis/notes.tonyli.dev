import type { HTMLProps } from "react";

export const Highlight = ({ children }: HTMLProps<HTMLSpanElement>) => {
  return (
    <span
      style={{
        paddingLeft: "0.5rem",
        paddingRight: "0.5rem",
        borderRadius: "0.25rem",
        display: "inline",
        backgroundColor:
          "hsl(var(--nextra-primary-hue)100% 97%/var(--tw-bg-opacity))",
        color: "hsl(var(--nextra-primary-hue)100% 45%/var(--tw-text-opacity))",
        fontFamily: "var(--font-monospace)",
        fontWeight: 700,
      }}
    >
      {children}
    </span>
  );
};
