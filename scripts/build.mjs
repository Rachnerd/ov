import { execSync } from 'node:child_process';

const steps = [
  {
    label: 'ui-components: analyze',
    workspace: 'packages/ui-components',
    script: 'analyze',
  },
  {
    label: 'ui-components-angular: generate',
    workspace: 'packages/ui-components-angular',
    script: 'generate',
  },
  { label: 'website: build', workspace: 'apps/website', script: 'build' },
  {
    label: 'website-angular: build',
    workspace: 'apps/website-angular',
    script: 'build',
  },
];

for (const { label, workspace, script } of steps) {
  console.log(`\n▶ ${label}`);
  execSync(`npm run ${script} --workspace=${workspace}`, { stdio: 'inherit' });
}
