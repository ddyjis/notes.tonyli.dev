export type FrontmatterCache = Record<
  string,
  {frontmatter: Record<string, string>; content: string}
>
