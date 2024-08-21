import * as playwright from 'playwright';
import { Object } from 'ts-toolbelt';

declare global {
  type Id = number | string;

  interface Action<P extends object> {
    params: Required<P>;
    getDefaultParameters(): Partial<PickOptional<P>>;
    execute(): Promise<playwright.Page>;
  }

  type ActionConstructor<T extends Action<object>> = T extends Action<infer P> ? new (params: P) => T : never;

  type ActionType = keyof ActionRegistry;

  interface TimeoutOptions {
    timeout?: number;
  }

  interface ElementActionOptions {
    timeout?: number;
    noWaitAfter?: boolean;
  }

  type WaitConfig = WaitConfigObject | WaitConfigString | number;
  type WaitConfigString = EventString | LoadStateString | RequestString | ResponseString | SelectorString | UrlString;
  type WaitConfigObject = EventWait | LoadStateWait | RequestWait | ResponseWait | SelectorWait | UrlWait | TimeoutWait | NavigationWait;

  interface NavigationWait {
    type: 'navigation';
    options: TimeoutOptions & {
      url?: string;
      waitUntil?: 'load' | 'domcontentloaded' | 'networkidle';
    };
  }

  type EventString = 'on:${string}';
  interface EventWait {
    type: 'event';
    options: TimeoutOptions & {
      event: string;
    };
  }

  type LoadStateString = `@:${'load' | 'domcontentloaded' | 'networkidle'}`;
  interface LoadStateWait {
    type: 'loadState';
    options: TimeoutOptions & {
      state?: string;
    };
  }

  type RequestString = `req:{string}`;
  interface RequestWait {
    type: 'request';
    options: {
      url: string;
    };
  }

  type ResponseString = `res:{string}`;
  interface ResponseWait {
    type: 'response';
    options: TimeoutOptions & {
      url: string;
    };
  }

  type SelectorString = `$:${string}`;
  interface SelectorWait {
    type: 'selector';
    options: TimeoutOptions & {
      selector: string;
    };
  }

  interface TimeoutWait {
    type: 'timeout';
    options: {
      timeout: number;
    };
  }

  type UrlString = `url:${string}`;
  interface UrlWait {
    type: 'url';
    options: TimeoutOptions & {
      url: string;
    };
  }

  interface BaseActionConfig extends TimeoutOptions {
    name?: string;
    type: ActionType;
    description?: string;
    wait?: readonly WaitConfig[];
    ignoreError?: boolean;
    debug?: boolean;
  }

  interface OpenActionConfig extends BaseActionConfig {
    type: 'openPage';
    url: string;
    cookies?: string;
    viewport?: { width: number; height: number };
    screenshot?: playwright.PageScreenshotOptions;
  }

  interface ClickActionConfig extends BaseActionConfig {
    type: 'click';
    selector: string;
    force?: boolean;
  }

  interface SelectActionConfig extends BaseActionConfig {
    type: 'select';
    selector: string;
    index?: number | number[];
    value?: string | string[];
    label?: string | string[];
  }

  interface CheckActionConfig extends BaseActionConfig {
    type: 'check';
    selector: string;
    force?: boolean;
    noWaitAfter?: boolean;
    position?: {
      x: number;
      y: number;
    };
    trial?: boolean;
  }

  interface BaseInputActionConfig extends BaseActionConfig {
    type: 'input';
    selector: string;
  }

  type InputActionConfig = BaseInputActionConfig & ({ value: string } | { faker: string; locale?: LocaleString });

  interface PauseActionConfig extends BaseActionConfig {
    type: 'pause';
  }

  interface ScrollIntoViewActionConfig extends BaseActionConfig {
    type: 'scrollIntoView';
    selector: string;
  }

  type ActionConfig =
    | OpenActionConfig
    | ClickActionConfig
    | InputActionConfig
    | PauseActionConfig
    | ScrollIntoViewActionConfig
    | SelectActionConfig
    | CheckActionConfig;

  // Utility types
  type PickOptional<T extends object> = Pick<T, Object.OptionalKeys<T>>;
  type PickRequired<T extends object> = Omit<T, Object.OptionalKeys<T>>;

  type LocaleString =
    | 'az'
    | 'ar'
    | 'cz'
    | 'de'
    | 'de_AT'
    | 'de_CH'
    | 'en'
    | 'en_AU'
    | 'en_AU_ocker'
    | 'en_BORK'
    | 'en_CA'
    | 'en_GB'
    | 'en_IE'
    | 'en_IND'
    | 'en_US'
    | 'en_ZA'
    | 'es'
    | 'es_MX'
    | 'fa'
    | 'fi'
    | 'fr'
    | 'fr_CA'
    | 'fr_CH'
    | 'ge'
    | 'id_ID'
    | 'it'
    | 'ja'
    | 'ko'
    | 'nb_NO'
    | 'ne'
    | 'nl'
    | 'nl_BE'
    | 'pl'
    | 'pt_BR'
    | 'pt_PT'
    | 'ro'
    | 'ru'
    | 'sk'
    | 'sv'
    | 'tr'
    | 'uk'
    | 'vi'
    | 'zh_CN'
    | 'zh_TW';
}
