import { Server } from '../src/server';
import { ApplicationContext } from '../src/applicationContext';
import { access, mkdir, writeFile } from 'fs/promises';
import { $, argv } from 'zx';
import { Configuration } from '../src/configuration';
import { join } from 'path';

const getVersion = async () => {
  const { version } = await import('../package.json');
  return version;
};

const createDirectoryIfNotExists = async (path: string) => {
  try {
    await access(path);
  } catch (error) {
    await mkdir(path, { recursive: true });
  }
};

const generateRedoc = async (openApiPath: string, outputPath: string) => {
  await $`docker run --rm -v ${process.env.PWD}:/spec redocly/cli build-docs ${openApiPath} -o ${join(
    outputPath,
    'zeitraum.html',
  )}`;
};

export const exportOpenApi = async (destination: string) => {
  await createDirectoryIfNotExists(destination);

  const apiToken = 'openapi-export';
  const version = await getVersion();
  const config: Configuration = {
    VERSION: version,
    PORT: 9090,
    API_TOKENS: [apiToken],
  };
  const applicationContext = new ApplicationContext(config);
  const server = new Server(applicationContext);

  const stop = await server.start();

  const response = await fetch('http://localhost:9090/openapi.json', {
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
  });

  const openApi = await response.json();
  await writeFile(join(destination, 'zeitraum.json'), JSON.stringify(openApi, null, 2));
  void stop();

  await generateRedoc(join(destination, 'zeitraum.json'), destination);
};

if (!argv.out) {
  throw new Error('Missing --out argument');
}

void exportOpenApi(argv.out);
