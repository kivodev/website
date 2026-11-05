// Fetches the API spec from the main repo and renames its tags to the sidebar group
// names in site.config.mjs, since starlight-openapi labels each group with the tag name.
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { parseDocument } from 'yaml';
import { openapi } from '../site.config.mjs';

const res = await fetch(openapi.url);
if (!res.ok) {
	console.error(`openapi: fetching ${openapi.url} failed with ${res.status} ${res.statusText}`);
	process.exit(1);
}
const doc = parseDocument(await res.text());
if (!/^3\./.test(String(doc.get('openapi')))) {
	console.error(`openapi: ${openapi.url} did not return an OpenAPI 3 document`);
	process.exit(1);
}

const rename = (name) => openapi.tagNames[name] ?? name;
for (const tag of doc.get('tags')?.items ?? []) {
	tag.set('name', rename(tag.get('name')));
}
for (const pathItem of doc.get('paths')?.items ?? []) {
	for (const operation of pathItem.value?.items ?? []) {
		const tags = operation.value?.get?.('tags');
		if (tags?.items) {
			tags.items = tags.items.map((tag) => doc.createNode(rename(tag.value ?? tag)));
		}
	}
}

await mkdir(dirname(openapi.path), { recursive: true });
await writeFile(openapi.path, doc.toString({ lineWidth: 0 }));
console.log(`openapi: fetched ${openapi.url} to ${openapi.path}`);
