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

## The API reference

`scripts/fetch-openapi.mjs` downloads `server/internal/api/openapi.yaml` from kivodev/kivo to `.openapi/kivo.yaml` before each build and dev server start. It reads `main`, or the commit in `KIVO_OPENAPI_REF` when set. The deploy sets that to the `sha` in the `openapi-changed` dispatch payload, so a spec change on kivodev/kivo's `main` rebuilds the site from that exact commit.

starlight-openapi names each sidebar group after a spec tag. The script renames the tags to the display names in `openapi.tagNames` in `site.config.mjs`; a new tag shows up under its own name until it's added there.

## TODO

- Discord: `links.discord` in `site.config.mjs` is a placeholder. Replace it with the real invite.
- Store links for the iPhone and iPad, Android TV and Samsung apps on `/docs/apps`.
