---
title: Design
aliases:
  - Plain Text Accounting Design
---

# Plain Text Accounting Design

## Account Names

## Tags

## Implementation Details

I have years of records but the current goal is to do accounting for current year first. Use `pad`
and `balance` for previous years.

Use CSV importer from beancount to extract transactions. Write a helper tool to extract data from
xls(x) and pdf to csv.

## Reference

- [Beancount —— 命令行複式簿記 wzyboy’s blog](https://wzyboy.im/post/1063.html) - basic concepts
- [使用 Beancount 記錄證券投資 wzyboy’s blog](https://wzyboy.im/post/1317.html) - tutorial on
  securities
- [beancount 簡易入門指南](https://yuchi.me/post/beancount-intro/) - tutorial on importer
  implementation
- [Beancount - Index - Google Docs](https://docs.google.com/document/d/1RaondTJCS_IUPBHFNdT8oqFKJjVJDsfsn6JEjBG04eA/edit#) -
  official documentation
- [Beancount - Cookbook - Google Docs](https://docs.google.com/document/d/1Tss0IEzEyAPuKSGeNsfNgb0BfiW2ZHyP5nCFBW1uWlk/edit) -
  official examples
