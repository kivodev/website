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

// The API reference spec, fetched from the main repo by scripts/fetch-openapi.mjs before
// each build. KIVO_OPENAPI_REF picks the commit, branch or tag to read it from.
const openapiRef = process.env.KIVO_OPENAPI_REF || 'main';

export const openapi = {
	url: `https://raw.githubusercontent.com/kivodev/kivo/${openapiRef}/server/internal/api/openapi.yaml`,
	path: '.openapi/kivo.yaml',
	// Sidebar group names for the spec's tags. Tags not listed keep their own name.
	tagNames: {
		setup: 'Setup',
		sessions: 'Sessions',
		'api-keys': 'API keys',
		users: 'Users',
		libraries: 'Libraries',
		works: 'Works',
		files: 'Files',
		tasks: 'Tasks',
		plays: 'Playback',
		history: 'Watch history',
		downloads: 'Downloads',
		media: 'Media',
		images: 'Images',
		events: 'Live events',
		health: 'Health',
	},
};
