import localFont from "next/font/local";

const sans = localFont({
  src: [
    { path: "../public/fonts/iAWriterQuattroS-Regular.woff2" },
    { path: "../public/fonts/iAWriterQuattroS-Bold.woff2", weight: "700" },
    { path: "../public/fonts/iAWriterQuattroS-Italic.woff2", style: "italic" },
    {
      path: "../public/fonts/iAWriterQuattroS-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-sans",
});
const mono = localFont({
  src: [
    { path: "../public/fonts/iAWriterMonoS-Regular.woff2" },
    { path: "../public/fonts/iAWriterMonoS-Bold.woff2", weight: "700" },
    { path: "../public/fonts/iAWriterMonoS-Italic.woff2", style: "italic" },
    {
      path: "../public/fonts/iAWriterMonoS-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-monospace",
});

type AppWrapperProps = {
  children: JSX.Element;
};

export const AppWrapper = ({ children }: AppWrapperProps) => {
  return (
    <main className={`${sans.variable} ${mono.variable}`}>{children}</main>
  );
};
