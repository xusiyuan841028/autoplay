import { eachOfSeries, eachLimit } from 'async';
import _ from 'lodash';
import * as playwright from 'playwright';

import config, { DEFAULT_THREADS, DEFAULT_SLOWMO, DEFAULT_HEADLESS, DEFAULT_TIMEOUT, DEFAULT_DEBUG, DEFAULT_DEVICE_SCALE_FACTOR } from './config';
import { create } from './pageAction';
import { log, Logger } from './utils/logger';

import type { Page, Browser, ViewportSize } from 'playwright';

type BrowserName = 'chromium' | 'firefox' | 'webkit';
type Network = 'Slow 3G' | 'Fast 3G';

interface LaunchOption {
  browser: BrowserName;
  device?: string;
  network?: Network;
}

export interface WorkflowConfig {
  name: string;
  time?: number;
  timeout?: number;
  thread?: number;
  rootDir?: string;
  headless?: boolean;
  slowMo?: number;
  debug?: boolean;
  confirm?: boolean;
  deviceScaleFactor?: number;
  viewport?: ViewportSize;
  browsers?: BrowserName[];
  devices?: string[];
  networks?: Network[];
  actions: ActionConfig[];
}

export class Workflow {
  static log: Logger = log.extend('workflow');
  config: WorkflowConfig;
  logger: Logger;

  constructor(config: WorkflowConfig) {
    this.config = config;
    this.logger = Workflow.log.extend(this.config.name);
    this.logger(config);
  }

  private createAction(page: Page, config: ActionConfig): Action<ActionConfig> {
    // TODO: For typescript type guard
    switch (config.type) {
      case 'openPage':
        return create(config.type, { ...config, page });
      case 'click':
        return create(config.type, { ...config, page });
      case 'input':
        return create(config.type, { ...config, page });
      case 'pause':
        return create(config.type, { ...config, page });
      case 'scrollIntoView':
        return create(config.type, { ...config, page });
      case 'select':
        return create(config.type, { ...config, page });
      case 'check':
        return create(config.type, { ...config, page });
      default:
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        throw new Error(`The action '${config}' is invalid!`);
    }
  }

  private createLaunchOptions(): LaunchOption[] {
    const { devices = [undefined], networks = [undefined], browsers = ['chromium'] } = this.config;
    const options: LaunchOption[] = [];
    browsers.forEach((browser) => {
      devices.forEach((device) => {
        networks.forEach((network) => {
          options.push({ network, browser, device });
        });
      });
    });
    return options;
  }

  async run(): Promise<void> {
    const {
      thread = DEFAULT_THREADS,
      time = config.executionIterations,
      // rootDir = DEFAULT_OUTPUT_FOLDER,
      headless = DEFAULT_HEADLESS,
      slowMo = DEFAULT_SLOWMO,
      timeout = DEFAULT_TIMEOUT,
      debug = DEFAULT_DEBUG,
      deviceScaleFactor = DEFAULT_DEVICE_SCALE_FACTOR,
      // confirm = DEFAULT_CONFIRM,
      actions,
    } = this.config;
    // TODO: write output files
    const options = this.createLaunchOptions();

    this.logger('start workflow');

    await eachOfSeries(options, async (option) => {
      let browser!: Browser;
      let errorCount = 0;
      try {
        this.logger(`start browser %O`, option);
        browser = await playwright[option.browser].launch({
          headless: config.playwright.headless,
          devtools: config.playwright.devtools,
          // headless: !debug && headless,
          // slowMo,
        });
        this.logger(`launch browser ${option.browser}`);

        const execActions = async (page: Page, turn: number): Promise<Page> => {
          const logger = this.logger.extend(`[${turn}]`);
          let currentPage: Page = page;
          try {
            await eachOfSeries(actions, async (actionConfig) => {
              const action = this.createAction(page, { ...actionConfig, debug });
              logger(`start action "${action.params.name}"`);
              currentPage = await action.execute();
              logger(`finish action "${action.params.name}"`);
            });
          } catch (e: unknown) {
            let message = 'Unknown error';
            if (typeof e === 'string') {
              message = e;
            } else if (e instanceof Error) {
              message = e.message;
            }
            logger('ERROR: %s', message);
            errorCount++;
            if (debug) {
              await page.pause();
            }
          }
          return currentPage;
        };

        await eachLimit(_.range(time), thread, async (i) => {
          const device = (option.device && playwright.devices[option.device]) ?? { viewport: { width: 1920, height: 1080 } };
          const context = await browser.newContext({
            deviceScaleFactor,
            ...device,
          });
          const page = await context.newPage();
          page.setDefaultTimeout(timeout);
          await execActions(page, i + 1);
          await page.close({ runBeforeUnload: true });
        });
      } finally {
        await browser?.close();
        this.logger(`the workflow has failed ${errorCount} times!`);
      }
    });
    this.logger('end workflow');
  }
}
