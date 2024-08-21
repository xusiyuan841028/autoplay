import { AbstractPageAction } from '../pageAction';
import { log } from '../utils/logger';

import type { PageActionParameters } from '../pageAction';
import type { Page } from 'playwright';

const logger = log.extend('action').extend('scrollIntoView');

export interface ScrollIntoViewActionParameters extends PageActionParameters, ScrollIntoViewActionConfig {}

export class ScrollIntoViewAction extends AbstractPageAction<ScrollIntoViewActionParameters> {
  static readonly defaultParams = {
    name: 'Open Page',
    description: 'Open a web page',
    force: true,
  };

  constructor(params: ScrollIntoViewActionParameters) {
    super(params);
  }

  getDefaultParameters() {
    return {
      ...AbstractPageAction.defaultParams,
      ...ScrollIntoViewAction.defaultParams,
    };
  }

  async run(): Promise<Page> {
    const { page, selector } = this.params;
    await (await page.$(selector))?.scrollIntoViewIfNeeded();
    return page;
  }
}
