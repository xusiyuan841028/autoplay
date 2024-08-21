import { AbstractPageAction } from '../pageAction';

import type { PageActionParameters } from '../pageAction';
import type { Page } from 'playwright';

export interface CheckActionParameters extends PageActionParameters, CheckActionConfig {}

export class CheckAction extends AbstractPageAction<CheckActionParameters> {
  static defaultParams = {
    name: 'Check a option',
    description: 'Check a option',
  };

  constructor(params: CheckActionParameters) {
    super(params);
  }

  getDefaultParameters() {
    return {
      ...AbstractPageAction.defaultParams,
      ...CheckAction.defaultParams,
    };
  }

  async run(): Promise<Page> {
    const { page, selector, timeout, trial, position, force, noWaitAfter } = this.params;
    await page.check(selector, { timeout, trial, position, force, noWaitAfter });
    return page;
  }
}
