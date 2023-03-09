// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const title = require("title");

const lightCodeTheme = require("prism-react-renderer/themes/duotoneLight");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Notes",
  tagline: "My Notes",
  favicon: "img/favicon.ico",
  url: "https://notes.tonyli.dev",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  organizationName: "ddyjis",
  projectName: "notes.tonyli.dev",
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          routeBasePath: "/",
          editUrl: "https://github.com/ddyjis/notes.tonyli.dev/edit/main/",
          showLastUpdateTime: true,
          async sidebarItemsGenerator({
            defaultSidebarItemsGenerator,
            ...args
          }) {
            const items = (await defaultSidebarItemsGenerator({ ...args })).map(
              (item) => {
                // @ts-ignore
                item.label = item.label
                  ? // @ts-ignore
                    title(item.label).replace(/-/g, " ")
                  : // @ts-ignore
                    item.label;
                return item;
              }
            );

            return items;
          },
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        disableSwitch: true,
      },
      image: "img/og.png",
      navbar: {
        title: "Notes",
        logo: {
          alt: "Logo",
          src: "img/pensieve.png",
        },
        items: [
          {
            href: "https://github.com/ddyjis/notes.tonyli.dev",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
