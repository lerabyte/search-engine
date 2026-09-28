/** Tiny local-only static server. No dependencies and no directory traversal. */
import http from 'node:http';
import { readFile, stat, realpath } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root = await realpath(resolve(process.argv[2] || '.'));
const port = Number(process.env.PORT || 4173);
const mime = { '.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.json':'application/json; charset=utf-8','.md':'text/plain; charset=utf-8','.txt':'text/plain; charset=utf-8','.ico':'image/x-icon' };
const server=http.createServer(async(req,res)=>{
  try {
    if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{Allow:'GET, HEAD'});return res.end('Method not allowed');}
    let pathname;
    try { pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname); } catch {res.writeHead(400);return res.end('Bad URL');}
    if(pathname.includes('\0')){res.writeHead(400);return res.end('Bad URL');}
    let path=resolve(root,'.'+pathname);
    if(path!==root&&!path.startsWith(root+sep)){res.writeHead(403);return res.end('Forbidden');}
    if((await stat(path)).isDirectory())path=resolve(path,'index.html');
    path=await realpath(path);
    if(!path.startsWith(root+sep)){res.writeHead(403);return res.end('Forbidden');}
    const body=await readFile(path);
    res.writeHead(200,{'Content-Type':mime[extname(path)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
    res.end(req.method==='HEAD'?undefined:body);
  } catch {res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('Not found');}
});
server.on('error',err=>{console.error(`Could not start server: ${err.message}`);process.exitCode=1;});
server.listen(port,'127.0.0.1',()=>console.log(`\nsearch-engine is running at http://localhost:${port}\nServing ${root}\nPress Ctrl+C to stop.\n`));
