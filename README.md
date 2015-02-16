## Prototype of a URL shortening service

A simple app for URL shortening.

* `POST /shorten` generate a short URL id for a URL specified by query parameter `link`
* `GET /{id}` resolve the URL pointed to by the given `id` (or return 404 if not found or 403 if blacklisted)

__To try it out__ run `npm install && npm run serve`:

* in browser: navigate to `http://localhost:9000/`
* from command line:

  `curl -X POST -H -d 'link=http://example.com' http://localhost:9000/shorten`

  `curl http://localhost:9000/SOME_ID_HERE`

### Things missing
* front-end tests
* protection against CSRF
* reasonable support for JavaScript-less clients
