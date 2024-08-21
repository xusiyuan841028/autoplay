import { AbstractPageAction } from '../pageAction';
import { log } from '../utils/logger';

import type { PageActionParameters } from '../pageAction';
import type { Page } from 'playwright';

const logger = log.extend('action').extend('pause');

export interface PauseActionParameters extends PageActionParameters, PauseActionConfig {}

export class PauseAction extends AbstractPageAction<PauseActionParameters> {
  static defaultParams = {
    name: 'Pause Page',
    description: 'pause in current page',
  };

  constructor(params: PauseActionParameters) {
    super(params);
  }

  getDefaultParameters() {
    return {
      ...AbstractPageAction.defaultParams,
      ...PauseAction.defaultParams,
    };
  }

  async run(): Promise<Page> {
    const { page } = this.params;
    await page.pause();
    return page;
  }
}
