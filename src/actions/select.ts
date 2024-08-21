import _ from 'lodash';

import { AbstractPageAction } from '../pageAction';
import { log } from '../utils/logger';

import type { PageActionParameters } from '../pageAction';
import type { Page } from 'playwright';

const logger = log.extend('action').extend('click');

export interface SelectActionParameters extends PageActionParameters, SelectActionConfig {}

export class SelectAction extends AbstractPageAction<SelectActionParameters> {
  static defaultParams = {
    name: 'Select a option',
    description: 'Select a option',
  };

  constructor(params: SelectActionParameters) {
    super(params);
  }

  getDefaultParameters() {
    return {
      ...AbstractPageAction.defaultParams,
      ...SelectAction.defaultParams,
    };
  }

  async run(): Promise<Page> {
    const { page, selector, index, value, label } = this.params;

    let values!: object[];
    if (index != null) {
      // TODO
    } else if (value != null) {
      // TODO
    } else if (label != null) {
      values = _.castArray(label).map((label) => ({ label }));
    } else {
      // TODO
    }

    await page.selectOption(selector, values);
    return page;
  }
}
