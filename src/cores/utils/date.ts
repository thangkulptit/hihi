import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.locale('vi'); 

/**
 * Get start day. VD: 00:00:00 of current day
 * @returns string
 * */
export function startOfDay(): string {
  return dayjs().startOf('D').format('YYYY-MM-DD HH:mm:ss');
}

/**
 * Get start month. VD: 00:00:00 of first day in month
 * @returns string
 * */
export function startOfMonth(): string {
  return dayjs().startOf('M').format('YYYY-MM-DD HH:mm:ss');
}

/**
 * Get current time
 * @returns string
 */
export function now(): string {
  return dayjs().format('YYYY-MM-DD hh:mm:ss');
}

export function today(): string {
  return dayjs().format('DD-MM-YYYY');
}

export function formatDate(date: string, format = 'HH:mm:ss DD/MM/YYYY'): string {
  return dayjs(date).format(format)
}

/**
 * Get unix time
 * @returns string
 */
export function unix(): number {
  return dayjs().unix();
}

export function fromNow(date: string): string {
  return dayjs(date).fromNow();
}
