module.exports = {
  '*.js': ['eslint --fix', 'prettier --write'],
  '*.{ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.{md,mdx}': ['prettier --write'],
}
