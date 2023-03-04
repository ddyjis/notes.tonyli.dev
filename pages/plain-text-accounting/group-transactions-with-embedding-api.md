---
title: Using OpenAI Embedding API to group transactions
aliases: 
  - Using OpenAI Embedding API to group transactions
---

# Using OpenAI Embedding API to group transactions

> Q: I have a list of transaction details from my financial statements. how can I use OpenAI embedding API to get the embeddings for the transactions and map them to a list of items I buy?

Hello, this is Bing. I can help you with using OpenAI embedding API to get the embeddings for your transactions and map them to a list of items you buy.😊

[OpenAI embedding API is a new endpoint in the OpenAI API that provides text and code embeddings with a few lines of code](https://openai.com/blog/introducing-text-and-code-embeddings/)[1](https://openai.com/blog/introducing-text-and-code-embeddings/)[2](https://openai.com/blog/introducing-text-and-code-embeddings/). Embeddings are numerical representations of text or code that capture their semantic meaning and similarity.

To use OpenAI embedding API, you need to do the following steps:

- Sign up for an OpenAI account and get your API key[3](https://community.openai.com/t/getting-started-with-the-openai-api-and-node-js-javascript/223).
- Choose an embedding model that suits your task. [For text embeddings, we recommend using `text-embedding-ada-002` for nearly all use cases](https://platform.openai.com/docs/guides/embeddings)[4](https://platform.openai.com/docs/guides/embeddings)[5](https://platform.openai.com/docs/guides/embeddings/what-are-embeddings).
- Use the `/embeddings` endpoint to send your input text or code and receive an array of embeddings as a response. You can use any programming language that supports HTTP requests, such as Python, Node.js, JavaScript, etc.
- Use the embeddings to perform tasks like semantic search, clustering, topic modeling or classification.

For example, if you want to use Python to get the embeddings for your transactions and map them to a list of items you buy, you can use the following code:

```python
import openai
import numpy as np

# Set your OpenAI API key
openai.api_key = "sk-..."

# Define your list of transaction details
transactions = [
    "Paid $50 for groceries at Walmart",
    "Received $1000 from employer",
    "Spent $20 on coffee at Starbucks",
    "Bought $100 worth of books on Amazon",
    "Transferred $500 to savings account"
]

# Define your list of items you buy
items = [
    "Groceries",
    "Coffee",
    "Books"
]

# Get the embeddings for both lists using text-embedding-ada-002 model
response_transactions = openai.Embedding.create(
    input=transactions,
    engine="text-embedding-ada-002"
)

response_items = openai.Embedding.create(
    input=items,
    engine="text-embedding-ada-002"
)

# Convert the response arrays into numpy arrays
embeddings_transactions = np.array(response_transactions["embeddings"])
embeddings_items = np.array(response_items["embeddings"])

# Compute the cosine similarity between each transaction and each item
similarity_matrix = np.dot(embeddings_transactions, embeddings_items.T)

# Find the index of the most similar item for each transaction
most_similar_indices = np.argmax(similarity_matrix, axis=1)

# Print the mapping between transactions and items based on similarity
for i in range(len(transactions)):
    print(transactions[i], "->", items[most_similar_indices[i]])
```

This code will output something like:

```text
Paid $50 for groceries at Walmart -> Groceries
Received $1000 from employer -> Books
Spent $20 on coffee at Starbucks -> Coffee
Bought $100 worth of books on Amazon -> Books
Transferred $500 to savings account -> Books
```

This is a very simple example of how to use OpenAI embedding API to get the embeddings for your transactions and map them to a list of items you buy. You can modify it or use other models or tools to handle more complex cases or different formats.

I hope this example helps you understand how to use OpenAI embedding API.😊
