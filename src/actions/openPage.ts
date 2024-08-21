import { AbstractPageAction } from '../pageAction';

import type { PageActionParameters } from '../pageAction';
import type { Page } from 'playwright';

export interface OpenPageParameters extends PageActionParameters, OpenActionConfig {}

export class OpenPageAction extends AbstractPageAction<OpenPageParameters> {
  static defaultParams = {
    name: 'Open Page',
    description: 'Open a web page',
    viewport: {
      width: 1920,
      height: 1080,
    },
  };

  constructor(params: OpenPageParameters) {
    super(params);
  }

  getDefaultParameters(): Partial<PickOptional<OpenPageParameters>> {
    return {
      ...AbstractPageAction.defaultParams,
      ...OpenPageAction.defaultParams,
    };
  }

  async run(): Promise<Page> {
    const { page, url, viewport } = this.params;
    if (viewport) {
      await page.setViewportSize(viewport);
    }
    await page.goto(url);
    return page;
  }
}
