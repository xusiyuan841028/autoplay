import path from 'path';

import { eachOfSeries } from 'async';
import _ from 'lodash';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { CheckAction } from './actions/check';
import { ClickAction } from './actions/click';
import { InputAction } from './actions/input';
import { OpenPageAction } from './actions/openPage';
import { PauseAction } from './actions/pause';
import { ScrollIntoViewAction } from './actions/scrollIntoView';
import { SelectAction } from './actions/select';
import { loadConfig } from './loadConfig';
import { register } from './pageAction';
import { log } from './utils/logger';
import { Workflow, WorkflowConfig } from './workflow';

declare global {
  interface ActionRegistry {
    openPage: ActionConstructor<OpenPageAction>;
    click: ActionConstructor<ClickAction>;
    input: ActionConstructor<InputAction>;
    pause: ActionConstructor<PauseAction>;
    scrollIntoView: ActionConstructor<ScrollIntoViewAction>;
    select: ActionConstructor<SelectAction>;
    check: ActionConstructor<CheckAction>;
  }
}

register('openPage', OpenPageAction);
register('click', ClickAction);
register('input', InputAction);
register('pause', PauseAction);
register('scrollIntoView', ScrollIntoViewAction);
register('select', SelectAction);
register('check', CheckAction);

const logger = log.extend('main');

async function execWorkflow(config: WorkflowConfig) {
  const workflow = new Workflow(config);
  await workflow.run();
}

async function bootstrap() {
  const argv = await yargs(hideBin(process.argv)).options({
    task: { type: 'string', default: '*', alias: 't' },
    group: { type: 'string', default: '*', alias: 'g' },
    base: { type: 'string', default: path.resolve(process.cwd(), 'config') },
    preset: { type: 'string', default: 'actions.yml' },
  }).argv;

  // load config
  const config = await loadConfig(
    _.pick(argv, [
      'task',
      'group',
      'base',
      'preset',
    ]),
  );
  await eachOfSeries(config, async (workflow) => execWorkflow(workflow));
}

bootstrap()
  .then(() => void 0)
  .catch((e) => {
    logger(e);
    throw e;
  });
