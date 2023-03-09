---
title: JSON Web Token
aliases:
  - JSON Web Token
  - JWT
---

# JWT

JSON Web Token JWT is about *authorization* not *authentication*. Authentication means the username and password are a match. Authorization is to prove the request for the resources comes from the same person that was previously authenticated.

When a user login to a server, the server generate a JWT which is encrypted by a secret key on the server and send it back to the client. *Nothing is stored in the server*. Data is stored in the JWT. One advantage of this is we don't have to share the user information across servers.

## Components

A JWT token consists of 3 components separated by a period.

- **header** - states the algorithm to use for verification
- **payload** - data of the JWT (e.g. username, user ID, fields for expiration (`iat` (issued at) / `exp` (expiration) / `eat` (expire at)))
- **verify signature** - ensure the user does not modify the token

Expiration will limit the hacker's access time

Both the header and payload are base64 encoded, then combined with a secret key and encrypt with the algorithm mentioned in header.

**Important**: The payload is readable by anyone so no sensitive data there

- [What Is JWT and Why Should You Use JWT - Web Dev Simplified](https://www.youtube.com/watch?v=7Q17ubqLfaM)
- [JSON Web Token Introduction - jwt.io](https://jwt.io/introduction)

## Use Case

If there are multiple services on different servers. JWT allows users switch between services without requiring re-login, given that the servers share the same secret key.

c.f. session token, same set of sessions needs to be maintained across all the servers.

Another use case is to use the same JWT over the entire architecture.

[What Is JWT and Why Should You Use JWT - Web Dev Simplified](https://www.youtube.com/watch?v=7Q17ubqLfaM)