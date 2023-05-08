import { $ } from 'zx';

await $`npm run migrate:prd --workspace=@zeitraum/server`;
await $`node packages/server/build/index.js`;
