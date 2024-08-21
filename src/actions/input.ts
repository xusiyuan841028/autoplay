import { allFakers } from '@faker-js/faker';

import { AbstractPageAction } from '../pageAction';

import type { PageActionParameters } from '../pageAction';
import type { Page } from 'playwright';

type BaseInputActionParameters = PageActionParameters;

export type InputActionParameters = BaseInputActionParameters & InputActionConfig;

export class InputAction extends AbstractPageAction<InputActionParameters> {
  static defaultParams = {
    name: 'input value',
    description: 'input value',
  };

  constructor(params: InputActionParameters) {
    super(params);
  }

  getDefaultParameters() {
    return {
      ...AbstractPageAction.defaultParams,
      ...InputAction.defaultParams,
    };
  }

  async run(): Promise<Page> {
    const { page, selector } = this.params;
    let fillValue!: string;
    if ('value' in this.params) {
      fillValue = this.params.value;
    } else {
      const { faker: value, locale = 'en' } = this.params;
      fillValue = allFakers[locale as keyof typeof allFakers].helpers.fake(value);
    }
    await page.fill(selector, fillValue);
    return page;
  }
}
