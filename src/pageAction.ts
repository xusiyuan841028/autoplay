import assert from 'power-assert';

import { log, Logger } from './utils/logger';

import type { Page } from 'playwright';

export interface PageActionParameters extends Omit<BaseActionConfig, 'type'> {
  page: Page;
  debug?: boolean;
}

const logProvider = log.extend('action');

type WaitConfigShorthand = Exclude<WaitConfigObject, TimeoutWait>;

const SHORTHAND_MAP: Record<string, { type: WaitConfigShorthand['type']; field: string }> = {
  res: {
    type: 'response',
    field: 'url',
  },
  req: {
    type: 'request',
    field: 'url',
  },
  '@': {
    type: 'loadState',
    field: 'state',
  },
  on: {
    type: 'event',
    field: 'event',
  },
  $: {
    type: 'selector',
    field: 'selector',
  },
  url: {
    type: 'url',
    field: 'url',
  },
};

export abstract class AbstractPageAction<P extends PageActionParameters = PageActionParameters> implements Action<P> {
  static defaultParams: PickOptional<PageActionParameters> = {
    name: 'Abstract Page Action',
    description: 'The abstract class for page action',
    wait: [] as WaitConfig[],
    ignoreError: false,
    debug: false,
  };

  readonly params: Required<P>;
  protected logger: Logger;

  constructor(params: P) {
    this.params = { ...this.getDefaultParameters(), ...params } as Required<P>;
    this.logger = this.params.name ? logProvider.extend(this.params.name) : logProvider;
  }

  async execute(): Promise<Page> {
    try {
      const [page] = await Promise.all([
        this.run(),
        ...this.wait(),
      ]);
      return page;
    } catch (e) {
      const { page, ignoreError, debug } = this.params;
      if (ignoreError) {
        return page;
      } else {
        console.log(debug);
        if (e instanceof Error) {
          this.logger(`${e.name}: ${e.message}`);
          // this.logger(e.stack);
        } else {
          this.logger(e);
        }
        if (debug) {
          await page.pause();
        }
        throw e;
      }
    }
  }

  protected wait(): Promise<any>[] {
    const { wait, page } = this.params;
    this.logger('wait: %O', wait);
    return (
      wait
        ?.map<WaitConfigObject | null>((item) => {
          if (typeof item === 'number') {
            return {
              type: 'timeout',
              options: {
                timeout: item,
              },
            };
          }
          if (typeof item === 'string') {
            const [prefix, ...values] = item.split(':');
            const shorthand = SHORTHAND_MAP[prefix];
            this.logger(item);
            if (shorthand != null) {
              const config: WaitConfigShorthand = {
                type: shorthand.type,
                options: { [shorthand.field]: values.join(':') },
              };
              this.logger(config);
              return config;
            } else {
              this.logger(`the wait value '${item}' is invalid!`);
              return null;
            }
          }
          return item;
        })
        .filter<WaitConfigObject>((config): config is WaitConfigObject => !!config)
        .map(async (config) => {
          switch (config.type) {
            case 'response':
              const { url, ...others } = config.options;
              return page.waitForResponse(url, { ...others });
            case 'timeout':
              const { timeout } = config.options;
              return page.waitForTimeout(timeout);
            case 'navigation':
              return page.waitForNavigation(config.options);
            case 'selector':
              console.dir(config.options);
              return page.waitForSelector(config.options.selector);
            default:
              this.logger(`the wait type '${config.type}' will be supported in future !`);
              break;
          }
        }) ?? []
    );
  }

  // Abstract methods
  abstract getDefaultParameters(): Partial<PickOptional<P>>;
  protected abstract run(): Promise<Page>;
}

const Actions = {} as ActionRegistry;

export function register<T extends keyof ActionRegistry>(name: T, actionType: ActionRegistry[T]): void {
  assert.ok(!(name in Actions), `The action name '${name}' has been registered!`);
  Actions[name] = actionType;
}

export function get<T extends keyof ActionRegistry>(name: T): ActionRegistry[T] {
  return Actions[name];
}

type ExtractActionType<ConstructorType> = ConstructorType extends ActionConstructor<infer T> ? T : never;
type ExtractParameterType<ConstructorType> = ExtractActionType<ConstructorType> extends Action<infer P> ? P : never;

export function create<T extends keyof ActionRegistry>(name: T, params: ExtractParameterType<ActionRegistry[T]>): ExtractActionType<ActionRegistry[T]> {
  // TODO: how to remove any?
  const Action = get(name) as any;
  assert.ok(Action, `The action name '${name}' hasn't been registered!`);
  return new Action(params);
}
