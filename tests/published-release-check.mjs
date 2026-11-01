import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const root=new URL('../',import.meta.url),base='https://astsaryov-beep.github.io/bacrf-finance-trainer/';
const unique=items=>[...new Set(items)];
function paths(html){return unique(['index.html','versions/index.html','v5.0.8/index.html',...Array.from(html.matchAll(/(?:src|href)="((?:assets\/)?[^/"?#]+\.(?:css|js))(?:\?[^"#]*)?"/g),m=>m[1])]);}
function cacheUrls(html){return unique(Array.from(html.matchAll(/(?:src|href)="((?:assets\/)?[^/"?#]+\.(?:css|js)\?v=[^"#]+)"/g),m=>m[1]));}
function compare(expected,actual,label){assert.ok(expected.equals(actual),'Published bytes differ: '+label);return {bytes:actual.length,git_blob_sha:createHash('sha1').update(Buffer.from('blob '+actual.length+'\0')).update(actual).digest('hex'),sha256:createHash('sha256').update(actual).digest('hex')};}
const fixture='<script src="assets/a.js?v=1"></script><script src="assets/a.js?v=1"></script><link href="https://example.org/out.css">';
assert.deepEqual(paths(fixture),['index.html','versions/index.html','v5.0.8/index.html','assets/a.js']);assert.deepEqual(cacheUrls(fixture),['assets/a.js?v=1']);
compare(Buffer.from('same'),Buffer.from('same'),'positive');assert.throws(()=>compare(Buffer.from('old'),Buffer.from('new'),'negative'),/Published bytes differ/);
if(process.argv.includes('--self-test'))console.log('PASS published-release verifier: unique local files, actual version URLs, exact bytes, mismatch rejected');
else{
 const sha=process.env.GITHUB_SHA;assert.match(sha||'',/^[a-f0-9]{40}$/);
 const html=readFileSync(new URL('index.html',root),'utf8'),version=html.match(/name="trainer-version" content="([^"]+)"/)[1];
 const checks=[...paths(html).map(path=>({path,url:path+'?release='+sha,kind:'file'})),...cacheUrls(html).map(url=>({path:url.split('?')[0],url,kind:'actual_cache_url'}))];
 const deadline=Date.now()+240000;let proof,lastError,attempt=0;
 while(Date.now()<deadline){
  attempt++;const results=[];try{
   for(let i=0;i<checks.length;i+=5)results.push(...await Promise.all(checks.slice(i,i+5).map(async c=>{
    const response=await fetch(base+c.url,{cache:'no-store',signal:AbortSignal.timeout(15000)});assert.ok(response.ok,c.url+' HTTP '+response.status);
    const actual=Buffer.from(await response.arrayBuffer()),expected=readFileSync(new URL(c.path,root));return {...c,...compare(expected,actual,c.url)};
   })));
   proof={status:'VERIFIED',commit:sha,version,checked_at:new Date().toISOString(),attempt,public_files:checks.filter(c=>c.kind==='file').length,actual_cache_urls:checks.filter(c=>c.kind==='actual_cache_url').length,checks:results};break;
  }catch(error){lastError=error.message;console.log('Published-release attempt '+attempt+' pending: '+lastError);await new Promise(resolve=>setTimeout(resolve,10000));}
 }
 assert.ok(proof,'Published release did not match within four minutes: '+lastError);
 mkdirSync(new URL('test-artifacts/',root),{recursive:true});writeFileSync(new URL('test-artifacts/published-release-proof.json',root),JSON.stringify(proof,null,2)+'\n');
 console.log('PASS published release: '+JSON.stringify(proof));
}
