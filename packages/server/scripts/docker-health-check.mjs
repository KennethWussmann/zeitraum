import { fetch, argv } from 'zx';

const host = argv.host ?? '127.0.0.1';
const port = argv.port ?? '9000';
const endpoint = argv.endpoint ?? 'health';

const res = await fetch(`http://${host}:${port}/${endpoint}`);

if (!res.ok) {
  console.error('Health check failed:', await res.text());
  process.exit(1);
} else {
  console.log('Health check passed:', await res.text());
}
