import Logo from "public/pensieve.png";

import Image from "next/image";
import React from "react";
import type { DocsThemeConfig } from "nextra-theme-docs";
import { useConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  docsRepositoryBase: "https://github.com/ddyjis/notes.tonyli.dev",
  editLink: {
    text: "Edit",
  },
  head: () => {
    const { frontMatter } = useConfig();
    return (
      <head>
        <title>
          {frontMatter.title ? `${frontMatter.title} | Pensieve` : "Pensieve"}
        </title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </head>
    );
  },
  logo: (
    <>
      <Image src={Logo} alt="Pensieve" width={36} height={36} />
      <h1
        style={{
          marginLeft: "1rem",
          fontSize: "1.25rem",
          fontWeight: 700,
        }}
      >
        Pensieve 儲思盆
      </h1>
    </>
  ),
  navigation: false,
  project: {
    link: "https://github.com/ddyjis/notes.tonyli.dev",
  },
  sidebar: {
    titleComponent: ({ title, type }) => {
      const color = "rgba(107,114,128,var(--tw-text-opacity))";

      if (type === "separator") {
        return (
          <div style={{ display: "flex", alignItems: "center", color }}>
            <div style={{ flex: 1, height: "1px", backgroundColor: "#000" }} />
            <span style={{ padding: "0 1rem" }}>{title}</span>
            <div style={{ flex: 1, height: "1px", backgroundColor: "#000" }} />
          </div>
        );
      }
      return <>{title}</>;
    },
  },
};

export default config;
