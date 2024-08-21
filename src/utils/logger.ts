import debug from 'debug';

export type Logger = debug.Debugger;
export const log = debug('sunfish');
