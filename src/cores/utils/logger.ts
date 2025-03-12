
export interface Logger {
  level?: string;
  setLevel(level: string): void;
  error(msg?: any, ...args: any): void;
  warn(msg?: any, ...args: any): void;
  info(msg?: any, ...args: any): void;
  debug(msg?: any, ...args: any): void;
}

export const Console: Logger = {
  level: '',
  setLevel(level: string): void {
    Console.level = level;
  },
  error(msg?: any, ...args:  any): void {
    console.log('[SB][error]', msg, ...args);
  },
  warn(msg?: any, ...args: any): void {
    console.log('[SB][warn]', msg, ...args);
  },
  info(msg?: any, ...args: any): void {
    console.log('[SB][info]', msg, ...args);
  },
  debug(msg?: any, ...args: any): void {
    console.log('[SB][debug]', msg, ...args);
  },
};
