# kivo.watch

The website and docs for [Kivo](https://github.com/kivodev/kivo), the open-source, self-hosted media server. Built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build).

- `/` is the home page (`src/pages/index.astro`).
- `/docs` is the Starlight docs (`src/content/docs/docs/`), including the API reference at `/docs/api`, generated from Kivo's OpenAPI spec by [starlight-openapi](https://github.com/HiDeoo/starlight-openapi).
- `/blog` is the blog (`src/content/blog/`), with an RSS feed at `/blog/rss.xml`. Posts with `draft: true` show in `npm run dev` and are left out of builds.

Shared links (Discord, GitHub, Download) and the API spec setting live in `site.config.mjs`.

## Run locally

Needs Node 22.12 or later.

```sh
npm ci
npm run dev        # http://localhost:4321
npm run build      # writes dist/
npm run preview    # serves dist/
```

## Deploys

`.github/workflows/deploy.yml` builds the site and deploys it to GitHub Pages:

- on every push to `main`,
- when kivodev/kivo sends a `repository_dispatch` event of type `openapi-changed`,
- nightly, and
- by hand from the Actions tab.

`public/CNAME` sets the domain to `kivo.watch`.

## Keeping the API reference in sync

The spec comes from one of two places, chosen by `KIVO_OPENAPI_SOURCE`:

- `vendored` (the default): `src/content/openapi/kivo.yaml`, a copy of `server/internal/api/openapi.yaml` from kivodev/kivo, committed here. Update it by copying the file over and committing.
- `remote`: `scripts/fetch-openapi.mjs` downloads the spec from `https://raw.githubusercontent.com/kivodev/kivo/main/server/internal/api/openapi.yaml` before each build (it runs as `prebuild`). `KIVO_OPENAPI_URL` overrides the address.

kivodev/kivo is private for now, so the deploy uses the vendored copy. Once it's public, set the repository variable `KIVO_OPENAPI_SOURCE` to `remote` (Settings, Secrets and variables, Actions, Variables). From then on each deploy fetches the current spec, and the main repo's `openapi-changed` dispatch rebuilds the site whenever the spec changes on `main`. The vendored copy can then be deleted.

To try the remote spec locally: `KIVO_OPENAPI_SOURCE=remote npm run build`.

## TODO

- Discord: `links.discord` in `site.config.mjs` is a placeholder. Replace it with the real invite.
- Store links for the iPhone and iPad, Android TV and Samsung apps on `/docs/apps`.
