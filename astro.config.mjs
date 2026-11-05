// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightOpenAPI, { openAPISidebarGroups } from 'starlight-openapi';
import { links, openapi } from './site.config.mjs';

export default defineConfig({
	site: 'https://kivo.watch',
	integrations: [
		starlight({
			title: 'Kivo',
			description: 'Docs for Kivo, the open-source, self-hosted media server.',
			logo: {
				dark: './src/assets/lockup.svg',
				light: './src/assets/lockup-light.svg',
				replacesTitle: true,
			},
			favicon: '/favicon.svg',
			head: [{ tag: 'link', attrs: { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' } }],
			social: [
				{ icon: 'github', label: 'GitHub', href: links.github },
				{ icon: 'discord', label: 'Discord', href: links.discord },
			],
			components: {
				SocialIcons: './src/components/DocsHeaderLinks.astro',
			},
			customCss: ['@fontsource-variable/inter', './src/styles/docs.css'],
			editLink: {
				baseUrl: 'https://github.com/kivodev/website/edit/main/',
			},
			plugins: [
				starlightOpenAPI([
					{
						base: 'docs/api',
						schema: openapi.path,
						sidebar: { label: 'API reference', collapsed: true },
					},
				]),
			],
			sidebar: [
				{
					label: 'Start here',
					items: [
						{ label: 'Overview', slug: 'docs' },
						{ label: 'Getting started', slug: 'docs/getting-started' },
						{ label: 'Apps', slug: 'docs/apps' },
					],
				},
				{
					label: 'Running Kivo',
					items: [
						{ label: 'Remote access', slug: 'docs/remote-access' },
						{ label: 'Reset a password', slug: 'docs/reset-password' },
					],
				},
				...openAPISidebarGroups,
			],
		}),
	],
});
