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
};

export default config;
