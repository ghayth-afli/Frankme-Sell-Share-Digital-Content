### Auth

Here's a basic flow for using refresh tokens in our authentication system:

1. Sign in:
   When a user signs in, we issue both an access token (valid for 24 hours) and a refresh token (valid for 48 hours).
   Return both tokens to the client.

2. Access protected resources:
   Client includes the access token in the Authorization header of requests to protected endpoints.
   Token expiration:
   If the access token expires (24 hours), the server returns a token expiration error to the client.
3. Use refresh token:
   Client sends the refresh token to the /refresh-tokens endpoint.
   Server verifies the refresh token and issues a new access token (valid for 24 hours).
   Return the new access token to the client.

4.Repeat steps 2-4 for subsequent requests.
