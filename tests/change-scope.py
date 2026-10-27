"""Conservative browser gate: unknown/failed comparisons run the full browser suite."""
import os,re,subprocess,sys

def needs_browser(paths):
    return any(not (p in ('README.md','AGENTS.md') or (p.startswith('docs/') and p.endswith(('.md','.json')))) for p in paths)

if __name__=='__main__':
    if '--self-test' in sys.argv:
        assert not needs_browser(['README.md','docs/project/PROJECT_STATE.md','docs/audits/data/QUALITY_AUDIT.json'])
        for p in ['index.html','assets/new.json','assets/a.js','tests/test.mjs','.github/workflows/verify.yml','package.json','v5.0.8/index.html']:
            assert needs_browser([p]),p
        import tempfile
        with tempfile.TemporaryDirectory() as directory:
            result=os.path.join(directory,'result')
            subprocess.run([sys.executable,__file__],env={**os.environ,'SCOPE_BASE_SHA':'invalid','GITHUB_OUTPUT':result},check=True)
            with open(result)as f:assert f.read()=='browser=true'+chr(10)
        print('PASS change scope: documentation-only gate;assets,tests,workflow,dependencies and frozen trigger browsers')
    else:
        task_base=os.environ.get('SCOPE_BASE_SHA','')
        try:
            if not re.fullmatch(r'[0-9a-f]{40}',task_base) or not task_base.strip('0'):raise ValueError('no comparison base')
            paths=subprocess.check_output(['git','diff','--name-only',task_base,'HEAD'],text=True).splitlines()
            run=needs_browser(paths)
        except (ValueError,subprocess.CalledProcessError):
            run=True
        with open(os.environ['GITHUB_OUTPUT'],'a')as f:print('browser='+str(run).lower(),file=f)
        print('Browser regression required:',run)
