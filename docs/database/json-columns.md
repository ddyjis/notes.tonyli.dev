---
title: JSON Columns
aliases:
  - JSON Columns
  - Use JSON Columns for Complicated Data
---

# JSON Columns

## Use JSON Columns for Complicated Data

Combine the benefits of both SQL and NoSQL by using a schema-free JSON column

**MySQL**

```sql
CREATE TABLE products (
  -- use normal columns for common attributes
  id bigint PRIMARY KEY auto_increment,
  author_id bigint NOT NULL,
  category_id bigint NOT NULL,
  name text NOT NULL,
  price numeric(15,2) NOT NULL,

  -- use a json attribute for seldom used attributes
  attributes json NOT NULL DEFAULT ('{}')
);
```

**PostgreSQL**

```sql
CREATE TABLE products (
  -- use normal columns for common attributes
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  author_id bigint NOT NULL,
  category_id bigint NOT NULL,
  name text NOT NULL,
  price numeric(15,2) NOT NULL,

  -- use a json attribute for seldom used attributes
  attributes jsonb NOT NULL DEFAULT '{}'
);
```

[JSON columns - Database Tip](https://sqlfordevs.com/json-columns?ref=Newsletter)
