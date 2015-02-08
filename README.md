## Prototype of a URL shortening service

A simple app for URL shortening. To try out the app run `npm install && npm run serve`.

* `POST /shorten` generate a short URL id for a URL specified by query parameter `link`
* `GET /{id}` resolve the URL pointed to by the given `id` (or return 404 if not found)

### Things missing
* protection against CSRF
* front-end tests and backend unit tests
* reasonable support for JavaScript-less clients
