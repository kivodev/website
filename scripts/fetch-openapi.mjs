// Fetches the API spec from the main repo when KIVO_OPENAPI_SOURCE=remote.
// With the default (vendored) it does nothing and the build uses the committed copy.
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { openapi } from '../site.config.mjs';

if (openapi.source !== 'remote') {
	console.log(`openapi: using the vendored spec at ${openapi.vendoredPath}`);
	process.exit(0);
}

const res = await fetch(openapi.remoteUrl);
if (!res.ok) {
	console.error(`openapi: fetching ${openapi.remoteUrl} failed with ${res.status} ${res.statusText}`);
	process.exit(1);
}
const text = await res.text();
if (!/^openapi:\s*3\./m.test(text)) {
	console.error(`openapi: ${openapi.remoteUrl} did not return an OpenAPI 3 document`);
	process.exit(1);
}
await mkdir(dirname(openapi.fetchedPath), { recursive: true });
await writeFile(openapi.fetchedPath, text);
console.log(`openapi: fetched ${openapi.remoteUrl} to ${openapi.fetchedPath}`);
