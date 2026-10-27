import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {existsSync,readFileSync} from 'node:fs';
import {resolve} from 'node:path';

const root=resolve(import.meta.dirname,'..');
const read=path=>readFileSync(resolve(root,path),'utf8');
const required=[
 'AGENTS.md','docs/project/PROJECT_STATE.md','docs/project/ROADMAP.md','docs/project/DECISIONS.md','docs/project/CHECKPOINTS.md',
 'docs/project/CHANGELOG.md','docs/audits/QA_REPORT.md','README.md','docs/audits/SOURCES_AUDIT.md',
 'docs/audits/INTEGRATION_COVERAGE.md','.github/PULL_REQUEST_TEMPLATE.md'
];
for(const file of required)assert.ok(existsSync(resolve(root,file)),'Missing recovery file: '+file);

const stateDocument=read('docs/project/PROJECT_STATE.md');
const m=stateDocument.match(/<!-- STATE_JSON_BEGIN -->\s*```json\s*([\s\S]*?)\s*```\s*<!-- STATE_JSON_END -->/);
assert.ok(m,'Project state JSON block missing');
const state=JSON.parse(m[1]);
const roadmap=read('docs/project/ROADMAP.md');
const checkpoints=read('docs/project/CHECKPOINTS.md');
const decisions=read('docs/project/DECISIONS.md');
const guide=read('AGENTS.md');
const html=read('index.html');
const readme=read('README.md');

assert.equal(state.schema_version,1,'Unsupported state schema');
assert.equal(state.repository,'astsaryov-beep/bacrf-finance-trainer');
assert.ok(/^\d+\.\d+(?:\.\d+)?(?: beta)?$/.test(state.working_version),'Working version format');
assert.equal(state.stable_version,'5.0.8','Stable release identifier changed');
assert.equal(state.stable_path,'v5.0.8/index.html','Stable release path changed');
assert.match(state.stable_blob_sha,/^[a-f0-9]{40}$/,'Stable hash format');
assert.ok(['READY','IN_PROGRESS','BLOCKED'].includes(state.phase),'Invalid development phase');
assert.match(state.next_task,/^T-\d{2}$/,'Next task ID missing');
assert.match(state.last_verified_checkpoint,/^CP-\d{8}-\d{3}$/,'Checkpoint identifier invalid');
assert.match(state.last_verified_commit,/^[0-9a-f]{40}$/,'Verified commit SHA missing');
assert.equal(state.last_verified_status,'VERIFIED');
assert.ok(String(state.last_verified_ci_run).includes('/actions/runs/'),'Verified CI link absent');
assert.ok(String(state.last_verified_deployment_run).includes('/actions/runs/'),'Verified Pages link absent');
if(state.phase==='READY') assert.equal(state.active_task,null,'Ready state cannot have active task');
else assert.match(state.active_task,/^T-\d{2}$/,'Active task ID required in unfinished work');

for(let i=1;i<=8;i++){
 const id='T-'+String(i).padStart(2,'0');
 assert.ok(roadmap.includes('## '+id),'Roadmap task missing: '+id);
}
for(const task of [state.next_task,state.active_task].filter(Boolean))
 assert.ok(roadmap.includes('## '+task),'State references unknown task: '+task);
assert.ok(checkpoints.includes('## '+state.last_verified_checkpoint),'Verified checkpoint not logged');
assert.ok(checkpoints.includes(state.last_verified_commit),'Verified commit not recorded in checkpoint log');
assert.ok(guide.includes('docs/project/PROJECT_STATE.md')&&guide.includes('docs/project/CHECKPOINTS.md'),'Recovery runbook incomplete');
assert.ok(decisions.includes('D-005'),'Development standard decision absent');
assert.ok(html.includes('content="'+state.working_version+'"'),'Working version differs from HTML meta');
assert.ok(readme.includes('Версия **'+state.working_version+'**'),'README version out of sync');
assert.ok(checkpoints.includes('T-08'),'Resilience task untracked');
assert.ok(existsSync(resolve(root,'v5.0.8/index.html')),'Frozen stable file missing');

// Hash recorded by GitHub's contents API is an actual Git blob SHA.
// Detect modifications of the frozen release, even if application logic still passes.
const frozenSha=execFileSync('git',['hash-object',state.stable_path],{cwd:root,encoding:'utf8'}).trim();
assert.equal(frozenSha,state.stable_blob_sha,'Frozen v5.0.8 changed! Restore original snapshot.');

const event=process.env.GITHUB_EVENT_NAME;
const ref=event==='pull_request'?process.env.GITHUB_BASE_SHA:
          event==='push'?process.env.GITHUB_BEFORE_SHA:null;
let changed=[];
if(ref&&/^[0-9a-f]{40}$/.test(ref)&&!/^0+$/.test(ref)){
 changed=execFileSync('git',['diff','--name-only',ref,'HEAD'],{cwd:root,encoding:'utf8'})
 .split(/\r?\n/).filter(Boolean);
 assert.ok(!changed.some(p=>p.startsWith('v5.0.8/')),'Stable release directory must never change');
 const affectsCode=changed.some(p=>p==='index.html'||p.startsWith('assets/')||p.startsWith('tests/')||p.startsWith('.github/workflows/')||p.startsWith('versions/'));
 if(affectsCode){
  assert.ok(changed.includes('docs/project/PROJECT_STATE.md'),'Code modification requires updated docs/project/PROJECT_STATE.md');
  assert.ok(changed.includes('docs/project/CHECKPOINTS.md'),'Code modification requires a recorded docs/project/CHECKPOINTS.md stage');
 }
 if(changed.includes('index.html')){
  assert.ok(changed.includes('docs/project/CHANGELOG.md'),'Application change must update docs/project/CHANGELOG.md');
  assert.ok(changed.includes('docs/audits/QA_REPORT.md'),'Application change must update docs/audits/QA_REPORT.md');
 }
}

console.log('PASS recovery standard: canonical state, roadmap, decisions, checkpoints, frozen Git SHA '+
 frozenSha.slice(0,12)+', working version '+state.working_version+
 (changed.length?', changed files '+changed.length:'')+'.');
