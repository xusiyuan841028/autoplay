import fs from 'fs';
import path from 'path';

import { glob } from 'glob';
import { load } from 'js-yaml';
import _, { Many } from 'lodash';
import assert from 'power-assert';

import { log } from './utils/logger';
import { WorkflowConfig } from './workflow';

type ActionPresetRecord = Many<ActionConfig>;

const logger = log.extend('config');

type ActionConfigRecord = string | ActionConfig;

type WorkflowConfigRecord = Omit<WorkflowConfig, 'actions'> & {
  actions: ActionConfigRecord[];
};

function loadYaml(path: string): unknown {
  return load(fs.readFileSync(path, 'utf8'));
}

export async function loadConfig(params: { group: string; task: string; base: string; preset: string }): Promise<WorkflowConfig[]> {
  const { group, task, base, preset } = params;
  // TODO: Validate
  const actionPresets = loadYaml(path.resolve(base, preset)) as Record<string, ActionPresetRecord>;

  logger('actionPresets: %O', actionPresets);

  const pattern = `${base}/${group}_**/${task}_**.yml`;
  const files = await glob(pattern);
  return files.map((filePath) => {
    const workflow = loadYaml(filePath) as WorkflowConfigRecord;
    const actions = workflow.actions.reduce((list, action) => {
      if (typeof action === 'string') {
        const actions = actionPresets[action];
        assert.ok(actions, `The action '${action}' is not existed!`);
        if (actions instanceof Array) {
          return list.concat(actions);
        } else {
          list.push(actions);
        }
      } else {
        list.push(action);
      }
      return list;
    }, [] as ActionConfig[]);
    return {
      ...workflow,
      actions,
    };
  });
}
