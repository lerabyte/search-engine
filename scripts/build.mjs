/** Bundle the double-clickable course and copy public files. No dependencies or remote fetching. */
import { rm, mkdir, cp, writeFile } from 'node:fs/promises';
import { buildStandalone } from './build-standalone.mjs';
await buildStandalone();
await rm('dist',{recursive:true,force:true});
await mkdir('dist',{recursive:true});
for(const path of ['index.html','styles.css','src','assets'])await cp(path,`dist/${path}`,{recursive:true});
await writeFile('dist/.nojekyll','');
console.log('Built dist/ — ready for any static host.');
