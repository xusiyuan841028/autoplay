import { AbstractPageAction } from '../pageAction';
import { log } from '../utils/logger';

import type { PageActionParameters } from '../pageAction';
import type { Page } from 'playwright';

const logger = log.extend('action').extend('click');

export interface ClickActionParameters extends PageActionParameters, ClickActionConfig {}

export class ClickAction extends AbstractPageAction<ClickActionParameters> {
  static defaultParams = {
    name: 'Open Page',
    description: 'Open a web page',
    force: true,
  };

  constructor(params: ClickActionParameters) {
    super(params);
  }

  getDefaultParameters() {
    return {
      ...AbstractPageAction.defaultParams,
      ...ClickAction.defaultParams,
    };
  }

  async run(): Promise<Page> {
    const { page, selector, force, timeout } = this.params;
    await page.click(selector, { force, timeout });
    return page;
  }
}
