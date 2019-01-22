import { commands } from '../data/cli.json';
import plugins from '../data/native.json';
import { join, resolve } from 'path';
import { keyBy, slugify } from '../../src/utils';
import Listr from 'listr';
import fs from 'fs-extra';

const MENU_DATA_DIR = resolve(__dirname, '../../src/components/menu/data');

const cliCommandMenu = keyBy(
  commands,
  (item) => item.name.slice(6),
  (item) => `/docs/cli/commands/${slugify(item.name.slice(6))}`
);

const nativePluginMenu = keyBy(
  plugins,
  (item) => item.displayName.trim(),
  (item) => `/docs/native/${slugify(item.name.slice(14))}`
);

const tasks = new Listr([
  {
    title: 'Build CLI command menu',
    task: () => fs.outputJSON(
      join(MENU_DATA_DIR, 'cli-commands.json'),
      cliCommandMenu,
      { spaces: 2 }
    )
  },
  {
    title: 'Build native plugins menu',
    task: () => fs.outputJSON(
      join(MENU_DATA_DIR, 'native-plugins.json'),
      nativePluginMenu,
      { spaces: 2 }
    )
  }
]);

export default tasks;

if (!module.parent) {
  tasks.run().catch(console.error);
}