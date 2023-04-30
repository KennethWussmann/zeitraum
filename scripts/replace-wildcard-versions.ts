/**
 * Script runs before publishing packages to registry to ensure correct dependency versions are used.
 * It replaces all * versions in all monorepo projects package.json files with their actual current version.
 * The changes made by the script should not be committed.
 */
import { readFile, writeFile } from 'fs/promises';
import { glob } from 'zx';

const replaceWildcards = (
  dependencies: Record<string, string>,
  versions: Record<string, string>,
): Record<string, string> =>
  Object.fromEntries(
    Object.entries(dependencies).map(([name, version]) => {
      if (version === '*' && name.startsWith('@zeitraum/')) {
        return [name, versions[name]];
      }
      return [name, version];
    }),
  );

(async () => {
  const packageJsonPaths = await glob(['packages/*/package.json']);
  const packageJsons: Record<string, any> = Object.fromEntries(
    await Promise.all(packageJsonPaths.map(async (path) => [path, JSON.parse(await readFile(path, 'utf8'))])),
  );
  const currentVersions: Record<string, string> = Object.fromEntries(
    Object.values(packageJsons).map((pkg) => [pkg.name, pkg.version]),
  );
  await Promise.all(
    Object.entries(packageJsons)
      .map(([path, pkg]) => [
        path,
        {
          ...pkg,
          ...Object.fromEntries(
            ['devDependencies', 'dependencies', 'peerDependencies']
              .filter((deps) => !!pkg[deps])
              .map((deps) => [deps, replaceWildcards(pkg[deps], currentVersions)]),
          ),
        },
      ])
      .map(([path, pkg]) => writeFile(path, JSON.stringify(pkg, null, 2), 'utf8')),
  );
})().catch(console.error);
