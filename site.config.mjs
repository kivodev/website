// Links and settings shared by the home page, the blog, the docs and the build.

export const links = {
	docs: '/docs/',
	blog: '/blog/',
	// TODO: replace with the real Discord invite before launch.
	discord: 'https://discord.gg/REPLACE-ME',
	github: 'https://github.com/kivodev/kivo',
	download: 'https://github.com/kivodev/kivo/releases',
};

export const docker = {
	image: 'ghcr.io/kivodev/kivo:latest',
};

// Where the API reference spec comes from.
//   vendored: src/content/openapi/kivo.yaml, committed to this repo (the default)
//   remote:   fetched from the main repo by scripts/fetch-openapi.mjs before each build
// Set KIVO_OPENAPI_SOURCE=remote (locally, or as a repository variable for the deploy
// workflow) once kivodev/kivo is public.
export const openapi = {
	source: process.env.KIVO_OPENAPI_SOURCE === 'remote' ? 'remote' : 'vendored',
	remoteUrl:
		process.env.KIVO_OPENAPI_URL ??
		'https://raw.githubusercontent.com/kivodev/kivo/main/server/internal/api/openapi.yaml',
	vendoredPath: 'src/content/openapi/kivo.yaml',
	fetchedPath: '.openapi/kivo.yaml',
};

export function openapiSchemaPath() {
	return openapi.source === 'remote' ? openapi.fetchedPath : openapi.vendoredPath;
}
