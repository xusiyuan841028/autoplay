/* eslint-disable n/no-process-env */
import { log } from './utils/logger';

export const DEFAULT_EXECUTION_NUMBER = process.env.EXECUTION_ITERATIONS ?? 1;
export const DEFAULT_OUTPUT_FOLDER = './results';
export const DEFAULT_THREADS = 2;
export const DEFAULT_SLOWMO = 0;
export const DEFAULT_HEADLESS = false;
export const DEFAULT_TIMEOUT = 60000;
export const DEFAULT_DEBUG = true;
export const DEFAULT_DEVICE_SCALE_FACTOR = 2;
export const DEFAULT_CONFIRM = false;

const logger = log.extend('config');

const config = {
  executionIterations: Number(process.env.EXECUTION_ITERATIONS ?? 1),
  playwright: {
    headless: process.env.PLAYWRIGHT_HEADLESS === 'true',
    devtools: process.env.PLAYWRIGHT_DEVTOOLS === 'true',
  },
};

logger(process.env.P);

logger('Config: %O', config);

export default config;
