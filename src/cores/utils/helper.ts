import { Console } from "./logger";

export function isDevelopment(): boolean {
  return import.meta.env.MODE !== 'production';
}

export function isObjectDiff(obj1: object, obj2: object): boolean {
  return JSON.stringify(obj1) != JSON.stringify(obj2)
}

export function hasValue(value: any): boolean {
  return value !== null && value !== '' && value !== undefined
}

export function delay(s: number): Promise<any> {
  return new Promise(resolve => setTimeout(resolve, s*1000));
}

export async function copyToClipboard(text: string): Promise<void> {
  try {
    if (!text) {
      throw new Error('Empty text')
    }

    await navigator.clipboard.writeText(text);

    Console.info(`Copied to clipboard`)
  } catch (err) {
    Console.error(`Failed to copy: `, err)
  }
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(amount);
}